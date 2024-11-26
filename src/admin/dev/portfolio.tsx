import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { VBox } from "../components/directional/flex";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { AccountLayout } from "@solana/spl-token";

export const PortfolioPage = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [nfts, setNfts] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);

  useEffect(() => {
    if (publicKey) {
      // Fetch NFTs
      const fetchNFTs = async () => {
        try {
          const nftArray = await getParsedNftAccountsByOwner({
            publicAddress: publicKey.toBase58(),
            connection,
          });
          setNfts(nftArray);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      };

      const fetchTokens = async () => {
        try {
          const accounts = await connection.getTokenAccountsByOwner(publicKey, {
            programId: new PublicKey(
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            ),
          });

          const tokenList = accounts.value.map(async (tokenAccountInfo) => {
            const accountData = AccountLayout.decode(
              tokenAccountInfo.account.data
            );
            const amount = BigInt(accountData.amount).toString();

            return {
              mint: new PublicKey(accountData.mint),
              amount,
            };
          });

          setTokens(await Promise.all(tokenList));
        } catch (error) {
          console.error("Error fetching tokens:", error);
        }

        fetchNFTs();
        fetchTokens();
      };
    }
  }, [publicKey, connection]);

  return (
    <div>
      {publicKey ? (
        <VBox alignItems="center">
          <h1>NFTs</h1>
          <div>
            {nfts.map((nft, index) => (
              <div key={index}>
                <img src={nft.data.uri} alt={nft.data.name} />
                <p>{nft.data.name}</p>
              </div>
            ))}
          </div>
          <h1>Tokens</h1>
          <div>
            {tokens.map((token, index) => (
              <div key={index}>
                <p>{token.symbol}</p>
                <p>{token.name}</p>
              </div>
            ))}
          </div>
        </VBox>
      ) : (
        <VBox alignItems="center">
          <WalletMultiButton />
        </VBox>
      )}
    </div>
  );
};
