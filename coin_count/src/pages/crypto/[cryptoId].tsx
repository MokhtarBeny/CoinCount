import { useRouter } from "next/router";

interface CryptoPageParams {
  cryptoId: string;
}

const CryptoPage: React.FC = () => {
  const router = useRouter();
  const { cryptoId } = router.query;

  return (
    <div>
      <h1>{cryptoId}</h1>
    </div>
  );
};

export default CryptoPage;
