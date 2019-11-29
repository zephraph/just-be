import Link from "next/link";

export default () => (
  <section>
    <h1>
      Justin <span>Bennett</span>
    </h1>
    {/* <Link href="/about">
      <a>About</a>
    </Link> */}
    <style jsx>{`
      h1 {
        margin: 0;
        padding: 0;
        font-size: 6vw;
      }
      span {
        color: orange;
      }
      section {
        display: flex;
        justify-content: center;
        margin-top: 5em;
      }
    `}</style>
  </section>
);
