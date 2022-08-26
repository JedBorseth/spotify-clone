import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
function Login({ providers }: any) {
  return (
    <div className="grid h-screen w-full place-items-center bg-black text-white">
      <div className="absolute top-0 h-5 w-1/4">
        <Image
          src="/spotify-1.svg"
          alt="spotify logo"
          width="1000"
          height="500"
        />
      </div>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.id}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="rounded border-2 border-green-400 p-3 hover:bg-green-400 hover:text-black"
          >
            Login With {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
