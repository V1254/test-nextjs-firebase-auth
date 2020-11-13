import Link from "next/Link";

export default function Home() {
  return (
    <div>
      <Link href="/login">
        <button>Login</button>
      </Link>
      <Link href="/signup">
        <button>Signup</button>
      </Link>
      <Link href="/restricted">
        <button>restricted</button>
      </Link>
      <Link href="/normal">
        <button>normal</button>
      </Link>
    </div>
  );
}
