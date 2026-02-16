import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createTree, mintToCollectionV1, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum';
import { publicKey } from '@metaplex-foundation/umi';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Endereço da coleção da Superteam Academy na Devnet
const COLLECTION_MINT = "SupeRTeamAcademyCollectionMintAddress1111";
const MERKLE_TREE = "SupeRAcademyMerkleTreeAddress111111111111";

export const mintCompressedCertificate = async (
    wallet: WalletContextState,
    courseName: string,
    level: string
) => {
    if (!wallet.publicKey) throw new Error("Wallet not connected");

    // 1. Setup Umi com a Identidade da Wallet do Usuário
    const umi = createUmi('https://api.devnet.solana.com')
        .use(mplBubblegum())
        .use(walletAdapterIdentity(wallet));

    try {
        console.log(`Iniciando mint de cNFT para: ${courseName}...`);

        // Na vida real, o backend ou um sistema de oracle assinaria a prova de conclusão.
        // Aqui estamos simulando o mint de um cNFT (Bubblegum).

        /* 
        Padrão solicitado pelo Paper:
        const { signature } = await mintToCollectionV1(umi, {
          leafOwner: publicKey(wallet.publicKey.toBase58()),
          merkleTree: publicKey(MERKLE_TREE),
          collectionMint: publicKey(COLLECTION_MINT),
          metadata: {
            name: `Academy: ${courseName}`,
            symbol: "ACADEMY",
            uri: "https://arweave.net/metadata-url", // Gerado dinamicamente
            sellerFeeBasisPoints: 0,
            collection: { key: publicKey(COLLECTION_MINT), verified: false },
            creators: [],
          },
        }).sendAndConfirm(umi);
        */

        // Simulação de delay de rede para UX
        await new Promise(resolve => setTimeout(resolve, 2000));

        return "5k9P...3nZp"; // Mock de assinatura da transação Solana
    } catch (error) {
        console.error("Erro ao emitir cNFT:", error);
        throw error;
    }
};

/**
 * Hook para buscar cNFTs do usuário via DAS API (Helius)
 * Requisito do Paper: "Leaderboard by indexing XP balances / Helius DAS"
 */
export const fetchUserCredentials = async (walletAddress: string) => {
    // Aqui usaremos o endpoint da Helius para buscar os ativos com o trait 'Academy'
    // return axios.post(HELIUS_URL, { jsonrpc: "2.0", id: "my-id", method: "getAssetsByOwner", ... })
    return [];
};
