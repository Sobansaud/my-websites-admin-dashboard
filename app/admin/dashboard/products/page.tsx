"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    productImage: string;
    discountPercentage: number;
    isNew: boolean;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        client.fetch(
            `*[_type == "product"]{
                _id,
                title,
                description,
                price,
                discountPercentage,
                isNew,
                "productImage": productImage.asset->url
            }`
        )
        .then(data => setProducts(data))
        .catch(error => console.error("Error fetching products", error));
    }, []);

    const handleDelete = async (productId: string) => {
        const result = await Swal.fire({
            title: "Are you sure you want to delete this product?",
            text: "You will not be able to recover this product.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            await client.delete(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            Swal.fire("Deleted!", "Product has been deleted.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to delete the product.", "error");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md p-3 border border-gray-200">
                        {/* Product Image */}
                        <div className="relative w-full h-40">
                            {product.productImage && (
                                <Image
                                    src={urlFor(product.productImage).url()}
                                    alt={product.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            )}
                        </div>

                        {/* Product Title */}
                        <h3 className="text-lg font-semibold mt-3 text-gray-800">{product.title}</h3>

                        {/* Description - Limiting to 2-3 lines */}
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.description.length > 60 ? `${product.description.slice(0, 60)}...` : product.description}
                        </p>

                        {/* Price and Discount */}
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-sm text-red-500">-{product.discountPercentage}%</span>
                            )}
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="mt-4 bg-red-500 text-white w-full py-2 rounded-md font-semibold hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
