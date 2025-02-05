
"use client";
import React, { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function AddProductPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null as File | null,
        stock: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Upload image to Sanity
            const imageAsset = await client.assets.upload("image", formData.image!);

            // Create product document
            await client.create({
                _type: "product",
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                productImage: {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: imageAsset._id,
                    },
                },
                stock: parseInt(formData.stock),
            });

            // Redirect to products page
            router.push("/dashboard/products");
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit} className="max-w-[800px] w-full flex flex-col gap-4">
                {/* Product Name */}
                <div>
                    <Label>Product Name</Label>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Enter Product Name"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Description */}
                <div>
                    <Label>Product Description</Label>
                    <Textarea
                        name="description"
                        placeholder="Enter Product Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Price */}
                <div>
                    <Label>Product Price</Label>
                    <Input
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Image */}
                <div>
                    <Label>Product Image</Label>
                    <Input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                    />
                    {formData.image && (
                        <div className="mt-2">
                            <Image
                                src={URL.createObjectURL(formData.image)}
                                alt="Preview"
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>

                {/* Product Stock */}
                <div>
                    <Label>Stock Level</Label>
                    <Input
                        type="number"
                        name="stock"
                        placeholder="Enter Stock Level"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Button type="submit" className="w-36 mt-2">
                    Add Product
                </Button>
            </form>
        </div>
    );
}