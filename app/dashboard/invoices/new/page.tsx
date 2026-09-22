"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Edit3,
  FileText,
  Mail,
  Plus,
  Tag,
  Trash2,
} from "lucide-react";

type InvoiceItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  tax: number;
};

const initialItems: InvoiceItem[] = [
  {
    id: 1,
    name: 'Monitor Bold G27 27" 240hz 4K',
    price: 306.41,
    quantity: 1,
    tax: 10,
  },
  {
    id: 2,
    name: "Keyboard NEST75 TKL 75%",
    price: 126.44,
    quantity: 1,
    tax: 10,
  },
];

export default function NewInvoicePage() {
  const [items, setItems] = useState<InvoiceItem[]>(initialItems);

  const [subject, setSubject] = useState("Electronic purchasing");
  const [dueDate, setDueDate] = useState("10 January 2025");
  const [discount, setDiscount] = useState(20);

  // ---------------------------------------
  // CALCULATIONS
  // ---------------------------------------

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  const taxTotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity * (item.tax / 100),
      0
    );
  }, [items]);

  const discountAmount = subtotal * (discount / 100);

  const total = subtotal + taxTotal - discountAmount;

  // ---------------------------------------
  // UPDATE PRODUCT
  // ---------------------------------------

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "quantity" || field === "tax"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  };

  // ---------------------------------------
  // REMOVE PRODUCT
  // ---------------------------------------

  const removeItem = (id: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  // ---------------------------------------
  // ADD PRODUCT
  // ---------------------------------------

  const addNewLine = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        name: "New product",
        price: 0,
        quantity: 1,
        tax: 10,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* TITLE */}

          <div className="flex items-center gap-3">
                    <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Create Invoice
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and send a new invoice to your customer.
              </p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Save as Draft
            </button>

            <button
              type="button"
              className="h-11 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Send Invoice
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN WORKSPACE
      ====================================================== */}

      <div className="p-5 lg:p-6">

        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-2
            lg:items-start
          "
        >

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="min-w-0 space-y-5">

            {/* -----------------------------------------------
                INVOICE DETAILS
            ------------------------------------------------ */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">

              <div className="mb-5 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold">
                  Invoice Detail
                </h2>
              </div>

              {/* BILLED TO */}

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Billed to
                </label>

                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold">
                      DR
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        Darlene Robertson
                      </p>

                      <p className="text-xs text-slate-500">
                        Darlene@email.com
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    className="text-slate-400 transition hover:text-slate-900"
                  >
                    <Edit3 size={17} />
                  </button>

                </div>
              </div>

              {/* SUBJECT + DATE */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Subject
                  </label>

                  <input
                    type="text"
                    value={subject}
                    onChange={(e) =>
                      setSubject(e.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Due Date
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      value={dueDate}
                      onChange={(e) =>
                        setDueDate(e.target.value)
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <CalendarDays
                      size={17}
                      className="absolute right-3 top-3 text-slate-400"
                    />

                  </div>
                </div>

              </div>

              {/* CURRENCY */}

              <div className="mt-4">

                <label className="mb-2 block text-sm font-medium">
                  Currency
                </label>

                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-sm transition hover:bg-slate-50"
                >

                  <span className="flex items-center gap-2">
                                       <span className="font-medium">
                      USD
                    </span>

                    <span className="text-slate-500">
                      United States Dollar
                    </span>
                  </span>

                  <ChevronDown
                    size={17}
                    className="text-slate-500"
                  />

                </button>

              </div>
            </div>

            {/* =================================================
                PRODUCT
            ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">

              <div className="mb-5 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold">
                  Product
                </h2>
              </div>

              {/* PRODUCT AREA */}

              <div className="rounded-xl bg-slate-50 p-4">

                {/* TABLE HEADER */}

                <div className="mb-4 grid grid-cols-[minmax(0,1fr)_65px_85px_25px] gap-3 text-xs font-medium text-slate-500">

                  <span>
                    Item
                  </span>

                  <span>
                    Qty*
                  </span>

                  <span>
                    Tax
                  </span>

                  <span />

                </div>

                {/* PRODUCTS */}

                <div className="space-y-4">

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[minmax(0,1fr)_65px_85px_25px] items-center gap-3"
                    >

                      {/* ITEM */}

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-[9px] text-slate-500">
                          IMG
                        </div>

                        <div className="min-w-0">

                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full truncate bg-transparent text-sm font-medium outline-none"
                          />

                          <div className="mt-1 flex items-center text-sm font-semibold">

                            <span>$</span>

                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "price",
                                  Number(e.target.value)
                                )
                              }
                              className="w-24 bg-transparent pl-1 outline-none"
                            />

                          </div>

                        </div>

                      </div>

                      {/* QUANTITY */}

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none focus:border-blue-500"
                      />

                      {/* TAX */}

                      <select
                        value={item.tax}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "tax",
                            Number(e.target.value)
                          )
                        }
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-2 text-sm outline-none focus:border-blue-500"
                      >
                        <option value={0}>0%</option>
                        <option value={5}>5%</option>
                        <option value={10}>10%</option>
                        <option value={15}>15%</option>
                        <option value={20}>20%</option>
                      </select>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="text-red-400 transition hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  ))}

                </div>

                {/* ADD LINE */}

                <button
                  type="button"
                  onClick={addNewLine}
                  className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
                >
                  <Plus size={16} />
                  Add New Line
                </button>

              </div>

              {/* COUPON + DISCOUNT */}

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* COUPON */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Add Coupon
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="h-11 w-full rounded-xl border border-slate-200 px-3 pr-10 text-sm outline-none focus:border-blue-500"
                    />

                    <Tag
                      size={17}
                      className="absolute right-3 top-3 text-slate-400"
                    />

                  </div>
                </div>

                {/* DISCOUNT */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Add Discount
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) =>
                        setDiscount(Number(e.target.value))
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 px-3 pr-10 text-sm outline-none focus:border-blue-500"
                    />

                    <span className="absolute right-3 top-3 text-sm text-slate-400">
                      %
                    </span>

                  </div>
                </div>

              </div>

              {/* NOTES */}

              <div className="mt-5">

                <label className="mb-2 block text-sm font-medium">
                  Notes
                </label>

                <textarea
                  rows={4}
                  placeholder="Additional notes (optional)..."
                  className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
                />

              </div>

            </div>
          </section>

          {/* =================================================
              RIGHT SIDE - PREVIEW
          ================================================= */}

          <section className="min-w-0">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">

              {/* PREVIEW HEADER */}

              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">

                <h2 className="text-lg font-semibold">
                  Preview
                </h2>

                <div className="flex items-center gap-3 text-sm">

                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                  >
                    <FileText size={15} />
                    PDF
                  </button>

                  
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                  >
                    <Mail size={15} />
                    Email
                  </button>

                </div>

              </div>

              {/* =================================================
                  ACTUAL INVOICE
              ================================================= */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                {/* INVOICE HEADER */}

                <div className="flex items-start justify-between border-b border-slate-200 pb-5">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                      ≋
                    </div>

                    <span className="font-bold">
                      PurpleHs
                    </span>

                  </div>

                  <span className="text-xs font-medium sm:text-sm">
                    INV-202501-00-45
                  </span>

                </div>

                {/* DETAILS */}

                <div className="grid grid-cols-2 gap-x-5 gap-y-6 border-b border-slate-200 py-6">

                  <div>
                    <p className="text-xs text-slate-400">
                      Due Date
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {dueDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Subject
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {subject}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Billed To
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Darlene Robertson
                    </p>

                    <p className="text-xs text-slate-500">
                      Darlene@email.com
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Currency
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      🇺🇸 USD - United States Dollar
                    </p>
                  </div>

                </div>

                {/* ITEMS */}

                <div className="py-5">

                  <div className="mb-3 grid grid-cols-[minmax(0,1fr)_35px_65px_70px] gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[10px] font-medium uppercase text-slate-500">

                    <span>
                      Item
                    </span>

                    <span>
                      Qty
                    </span>

                    <span>
                      Price
                    </span>

                    <span className="text-right">
                      Amount
                    </span>

                  </div>

                  <div className="space-y-4">

                    {items.map((item) => {

                      const amount =
                        item.price * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-[minmax(0,1fr)_35px_65px_70px] items-center gap-2 px-3 text-xs"
                        >

                          <div className="flex min-w-0 items-center gap-2">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-100 text-[8px] text-slate-500">
                              IMG
                            </div>

                            <span className="truncate font-medium">
                              {item.name}
                            </span>

                          </div>

                          <span>
                            {item.quantity}
                          </span>

                          <span>
                            ${item.price.toFixed(2)}
                          </span>

                          <span className="text-right font-medium">
                            ${amount.toFixed(2)}
                          </span>

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* TOTALS */}

                <div className="border-t border-slate-200 pt-5">

                  <div className="ml-auto max-w-xs space-y-3 text-sm">

                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        Sub total
                      </span>

                      <span>
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        Discount -{discount}%
                      </span>

                      <span>
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        Tax
                      </span>

                      <span>
                        ${taxTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold">
                      <span>
                        Total
                      </span>

                      <span>
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold">
                      <span>
                        Amount due
                      </span>

                      <span>
                        ${total.toFixed(2)}
                      </span>
                    </div>

                  </div>

                </div>

                {/* NOTES */}

                <div className="mt-6 border-t border-slate-200 pt-5 text-xs">

                  <span className="font-semibold">
                    *Notes:
                  </span>{" "}

                  <span className="text-slate-500">
                    Products that you have purchased cannot
                    be returned.
                  </span>

                </div>

                {/* ATTACHMENT */}

                <div className="mt-5 border-t border-slate-200 pt-5">

                  <p className="mb-3 text-sm font-semibold">
                    Attachment
                  </p>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-3">

                    <div className="flex items-center gap-2">

                      <FileText
                        size={18}
                        className="text-red-500"
                      />

                      <span className="text-xs font-medium">
                        Product list.PDF
                      </span>

                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      <Download size={14} />
                      Download
                    </button>

                  </div>

                </div>

              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}