"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatCurrency } from "@/lib/formatter";
import { Button } from "@/components/ui/button";
import { addProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";

export default function ProductForm({ product }: { product?: Product | null }) {
	const [error, action] = useFormState(addProduct, {});
	const [priceInCents, setPriceInCents] = useState<number | undefined>(
		product?.priceInCents
	);

	return (
		<form action={action} className="space-y-8">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					required
					defaultValue={product?.name || ""}
				/>
				{error.name && <div className="text-destructive">{error.name}</div>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="priceInCents">Price In Cents</Label>
				<Input
					type="number"
					id="priceInCents"
					name="priceInCents"
					required
					value={priceInCents}
					onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
				/>
				<div className="text-muted-foreground">
					{formatCurrency((priceInCents || 0) / 100)}
				</div>
				{error.priceInCents && (
					<div className="text-destructive">{error.priceInCents}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Input
					id="description"
					name="description"
					required
					defaultValue={product?.description || ""}
				/>
				{error.description && (
					<div className="text-destructive">{error.description}</div>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="file">File</Label>
				<Input type="file" id="file" name="file" required />
				{error.file && <div className="text-destructive">{error.file}</div>}
			</div>
			<div className="space-y-2">
				<Label htmlFor="image">Image</Label>
				<Input type="file" id="image" name="image" required />
				{error.image && <div className="text-destructive">{error.image}</div>}
			</div>
			<SubmitButton />
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			{pending ? "Saving..." : "Save"}
		</Button>
	);
}