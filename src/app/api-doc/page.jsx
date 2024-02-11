import { getApiDocs } from "./swagger";
import ReactSwagger from "./ReactSwagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}