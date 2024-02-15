import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <section className="center w-full h-full">
        <Link className="primary-btn px-8 py-3 rounded-full" href="/user/home">
          Login
        </Link>
      </section>
    </main>
  );
}
