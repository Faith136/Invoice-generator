"use client";

import { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";

type ProductType = "Product" | "Service";
type ProductStatus = "Active" | "Inactive";

type Product = {
  id: number;
  name: string;
  description: string;
  type: ProductType;
  price: number;
  tax: number;
  status: ProductStatus;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Website Development",
    description: "Business website development",
    type: "Service",
    price: 80000,
    tax: 16,
    status: "Active",
  },
  {
    id: 2,
    name: "Domain Registration",
    description: "1 year domain registration",
    type: "Service",
    price: 2500,
    tax: 16,
    status: "Active",
  },
  {
    id: 3,
    name: "Hosting - 1 Year",
    description: "Business hosting package",
    type: "Service",
    price: 12000,
    tax: 16,
    status: "Active",
  },
  {
    id: 4,
    name: "Wireless Keyboard",
    description: "Bluetooth wireless keyboard",
    type: "Product",
    price: 4500,
    tax: 16,
    status: "Active",
  },
  {
    id: 5,
    name: "Monitor 27 inch",
    description: "27 inch 4K monitor",
    type: "Product",
    price: 35000,
    tax: 16,
    status: "Active",
  },
  {
    id: 6,
    name: "SEO Consultation",
    description: "SEO audit and consultation",
    type: "Service",
    price: 15000,
    tax: 16,
    status: "Inactive",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState<
    "All" | ProductType
  >("All");

  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    type: "Product" as ProductType,
    price: "",
    tax: "16",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" ||
        product.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [products, search, typeFilter]);

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      description: newProduct.description,
      type: newProduct.type,
      price: Number(newProduct.price),
      tax: Number(newProduct.tax),
      status: "Active",
    };

    setProducts((current) => [
      ...current,
      product,
    ]);

    setNewProduct({
      name: "",
      description: "",
      type: "Product",
      price: "",
      tax: "16",
    });

    setShowModal(false);
  };

  const deleteProduct = (id: number) => {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =========================================
          HEADER
      ========================================== */}

      <header className="border-b border-slate-200 bg-white px-6 py-6 lg:px-8">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Products & Services
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage the products and services you offer
              to your customers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Plus size={17} />

            Add Product / Service
          </button>

        </div>

      </header>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <main className="p-5 lg:p-6">

        {/* =====================================
            SUMMARY
        ====================================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <p className="text-sm text-slate-500">
              Total Items
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {products.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Products and services
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <p className="text-sm text-slate-500">
              Products
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {
                products.filter(
                  (product) =>
                    product.type === "Product"
                ).length
              }
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Physical products
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <p className="text-sm text-slate-500">
              Services
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {
                products.filter(
                  (product) =>
                    product.type === "Service"
                ).length
              }
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Services offered
            </p>

          </div>

        </div>

        {/* =====================================
            TABLE CARD
        ====================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="border-b border-slate-200 p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  All Products & Services
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredProducts.length} items
                  displayed
                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={17}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search products..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                  />

                </div>

                {/* FILTER */}

                <div className="relative">

                  <SlidersHorizontal
                    size={16}
                    className="pointer-events-none absolute left-3 top-3 text-slate-400"
                  />

                  <select
                    value={typeFilter}
                    onChange={(e) =>
                      setTypeFilter(
                        e.target.value as
                          | "All"
                          | ProductType
                      )
                    }
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm outline-none focus:border-blue-500 sm:w-40"
                  >
                    <option value="All">
                      All types
                    </option>

                    <option value="Product">
                      Products
                    </option>

                    <option value="Service">
                      Services
                    </option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-3 text-slate-400"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =====================================
              TABLE
          ====================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-237.5">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50/70 text-left">

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Product / Service
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Tax
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    <span className="sr-only">
                      Actions
                    </span>
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => (

                    <tr
                      key={product.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* NAME */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
                            {product.type === "Product"
                              ? "P"
                              : "S"}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-900">
                              {product.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {product.description}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* TYPE */}

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            product.type ===
                            "Product"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {product.type}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td className="px-6 py-4 text-sm font-semibold">
                        {formatCurrency(product.price)}
                      </td>

                      {/* TAX */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {product.tax}%
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            product.status ===
                            "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {product.status}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4 text-right">

                        <div className="flex items-center justify-end gap-1">

                          <button
                            type="button"
                            onClick={() =>
                              deleteProduct(
                                product.id
                              )
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <MoreHorizontal
                              size={18}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center"
                    >

                      <p className="text-sm font-medium text-slate-700">
                        No products or services
                        found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search
                        or filter.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}

          <div className="border-t border-slate-200 px-6 py-4">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {products.length}
              </span>{" "}
              items
            </p>

          </div>

        </div>

      </main>

      {/* =========================================
          ADD PRODUCT / SERVICE MODAL
      ========================================== */}

      {showModal && (

        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="text-lg font-semibold">
                  Add Product / Service
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add something that can be used
                  on an invoice.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5 p-6">

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>

                <input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Website Development"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description:
                        e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Brief description..."
                  className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* TYPE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Type
                </label>

                <select
                  value={newProduct.type}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      type: e.target
                        .value as ProductType,
                    })
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Product">
                    Product
                  </option>

                  <option value="Service">
                    Service
                  </option>
                </select>

              </div>

              {/* PRICE + TAX */}

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    placeholder="0.00"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tax
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      min="0"
                      value={newProduct.tax}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          tax: e.target.value,
                        })
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 px-3 pr-8 text-sm outline-none focus:border-blue-500"
                    />

                    <span className="absolute right-3 top-3 text-sm text-slate-400">
                      %
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="h-10 rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addProduct}
                className="h-10 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Add Item
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}