import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createV1, mplCore } from '@metaplex-foundation/mpl-core';
import { generateSigner, publicKey, transactionBuilder } from '@metaplex-foundation/umi';
import { WalletContextState } from '@solana/wallet-adapter-react';

export const useMetaplex = (wallet: WalletContextState) => {
    const umi = createUmi('https://api.devnet.solana.com')
        .use(mplCore())
        .use(walletAdapterIdentity(wallet));

    const mintCertificate = async (courseName: string, learnerName: string) => {
        if (!wallet.publicKey) throw new Error('Wallet not connected');

        const assetSigner = generateSigner(umi);

        console.log(`Minting certificate for ${courseName}...`);

        try {
            const tx = await createV1(umi, {
                asset: assetSigner,
                name: `Superteam Academy: ${courseName}`,
                uri: 'https://arweave.net/placeholder-uri', // In a real app, this would be a JSON metadata URI
                plugins: [
                    {
                        type: 'Attributes',
                        attributeList: [
                            { key: 'Course', value: courseName },
                            { key: 'Learner', value: learnerName },
                            { key: 'Date', value: new Date().toLocaleDateString() },
                            { key: 'XP', value: '1200' },
                        ],
                    }
                ],
            }).sendAndConfirm(umi);

            return {
                signature: tx.signature,
                assetId: assetSigner.publicKey.toString(),
            };
        } catch (error) {
            console.error('Minting failed:', error);
            throw error;
        }
    };

    return { mintCertificate };
};
