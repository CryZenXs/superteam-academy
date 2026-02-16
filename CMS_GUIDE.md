# ✍️ CMS & Content Management Guide

This project is tailored to work with a Headless CMS (primarily **Sanity.io**). This guide explains how to structure and publish educational content for the Superteam Academy.

## 🗂️ Data Schema

Each Course is structured into a hierarchy: **Course -> Modules -> Lessons**.

### 1. Course Object
- **Title**: String
- **Slug**: Unique URL identifier
- **Description**: Rich Text / Markdown
- **Difficulty**: Enum (Beginner, Intermediate, Advanced)
- **XP Reward**: Number
- **Track**: Enum (Fundamentals, Development, Security, DeFi)
- **Instructor**: Reference to Author

### 2. Lesson Object
- **Type**: Choice (Content or Challenge)
- **Content**: Markdown field with support for code blocks.
- **Challenge Metadata (for Coding Lessons)**:
    - **Starter Code**: The initial code shown to the student.
    - **Solution**: The hidden solution code.
    - **Test Cases**: JSON object defining input/expected output.
    - **Validation Logic**: Script to run against student code.

## 🚀 How to Add a New Course

1. **Access the CMS Dashboard**: (e.g., Sanity Studio).
2. **Create a new 'Course' Document**: Fill in the title, description, and metadata.
3. **Draft Modules**: Group lessons into logical blocks.
4. **Author Lessons**:
    - For educational content, use the Markdown editor.
    - For coding challenges, populate the Monaco Editor configuration fields.
5. **Publish**: Once published, the Next.js frontend will fetch the latest content via the `LearningProgressService`.

## 🛠️ Content Best Practices

- **Images**: Use optimized WebP formats.
- **Code Blocks**: Always specify the language (rust, typescript, json) for proper syntax highlighting in Monaco.
- **XP Calibration**:
    - Beginner Lessons: 10-20 XP
    - Advanced Challenges: 100-200 XP
    - Course Completion: 1000+ XP

## 🔄 Syncing with Web3
When a course is published in the CMS, it should ideally trigger a script (or manual txn) to create the corresponding **Course PDA** on-chain to allow for verifiable enrollment.
