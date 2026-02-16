use anchor_lang::prelude::*;

declare_id!("Ag4vG1S1vP2N1m1v4G1v1B1v1S1v1H1v1I1v1E1v1L"); // Placeholder ID

#[program]
pub mod superteam_academy {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>, name: String) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.name = name;
        user_profile.xp = 0;
        user_profile.completed_courses = 0;
        user_profile.authority = *ctx.accounts.authority.key;
        Ok(())
    }

    pub fn complete_course(ctx: Context<CompleteCourse>, course_id: String, xp_reward: u64) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.xp += xp_reward;
        user_profile.completed_courses += 1;
        
        emit!(CourseCompleted {
            user: *ctx.accounts.authority.key,
            course_id: course_id,
            xp_gained: xp_reward,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4 + 50 + 8 + 8, // Discriminator + Pubkey + String(50) + u64 + u64
        seeds = [b"user-profile", authority.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CompleteCourse<'info> {
    #[account(
        mut,
        seeds = [b"user-profile", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Account<'info, UserProfile>,
    pub authority: Signer<'info>,
}

#[account]
pub struct UserProfile {
    pub authority: Pubkey,
    pub name: String,
    pub xp: u64,
    pub completed_courses: u64,
}

#[event]
pub struct CourseCompleted {
    pub user: Pubkey,
    pub course_id: String,
    pub xp_gained: u64,
}
