'use client';

import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  route: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercent?: number;
  image: string;
  rating: number;
  totalComments: number;
  satisfactionRate: number;
}

interface ProductListProps {
  title: string;
  products: Product[];
}

export default function ProductList({ title, products }: ProductListProps) {
  return (
    <section className="py-12 bg-xam">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-xanh-duongdam mb-3">
            {title}
          </h2>
          <div className="w-24 h-1 bg-do mx-auto"></div>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}