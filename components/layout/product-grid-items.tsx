import Grid from "components/grid";
import { ProductCard } from "components/grid/product-card";
import { Product } from "lib/shopify/types";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product, i) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <ProductCard product={product} priority={i < 6} />
        </Grid.Item>
      ))}
    </>
  );
}
