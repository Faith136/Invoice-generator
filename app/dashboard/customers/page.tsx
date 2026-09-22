"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  invoices: number;
  totalSpent: number;
  outstanding: number;
  status: "Active" | "Inactive";
};

const customers: Customer[] = [
  {
    id: 1,
    name: "Darlene Robertson",
    email: "darlene@email.com",
    phone: "+1 202-555-0147",
    invoices: 12,
    totalSpent: 4320.5,
    outstanding: 850,
    status: "Active",
  },
  {
    id: 2,
    name: "Cody Fisher",
    email: "cody.fisher@email.com",
    phone: "+1 202-555-0188",
    invoices: 8,
    totalSpent: 2850.75,
    outstanding: 0,
    status: "Active",
  },
  {
    id: 3,
    name: "Kristin Watson",
    email: "kristin.watson@email.com",
    phone: "+1 202-555-0119",
    invoices: 15,
    totalSpent: 6840.2,
    outstanding: 1250,
    status: "Active",
  },
  {
    id: 4,
    name: "Jerome Bell",
    email: "jerome.bell@email.com",
    phone: "+1 202-555-0192",
    invoices: 5,
    totalSpent: 1920,
    outstanding: 450,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Brooklyn Simmons",
    email: "brooklyn@email.com",
    phone: "+1 202-555-0175",
    invoices: 21,
    totalSpent: 9210.8,
    outstanding: 0,
    status: "Active",
  },
  {
    id: 6,
    name: "Guy Hawkins",
    email: "guy.hawkins@email.com",
    phone: "+1 202-555-0134",
    invoices: 7,
    totalSpent: 3150.4,
    outstanding: 720,
    status: "Active",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.phone
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white px-6 py-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Customers
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Our customers and a track of their
              invoices.
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Plus size={17} />
            Add Customer
          </button>

        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="p-5 lg:p-6">

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <p className="mt-2 text-2xl font-semibold">
              248
            </p>

            <p className="mt-1 text-xs text-emerald-600">
              +12 this month
            </p>
          </div>
      

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Outstanding
            </p>

            <p className="mt-2 text-2xl font-semibold">
              $12,850
            </p>

            <p className="mt-1 text-xs text-rose-500">
              18 invoices overdue
            </p>
          </div>

        </div>

        {/* =================================================
            CUSTOMER TABLE CARD
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="border-b border-slate-200 p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  All Customers
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredCustomers.length} customers
                  displayed
                </p>
              </div>

              {/* SEARCH + FILTER */}

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={17}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                  />

                </div>

                {/* FILTER */}

                <div className="relative">

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value as
                          | "All"
                          | "Active"
                          | "Inactive"
                      )
                    }
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm outline-none focus:border-blue-500 sm:w-36"
                  >
                    <option value="All">
                      All status
                    </option>

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                  <SlidersHorizontal
                    size={16}
                    className="pointer-events-none absolute left-3 top-3 text-slate-400"
                  />

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-3 text-slate-400"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-237.5">

              {/* TABLE HEAD */}

              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-left">

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Invoices
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Total Spent
                  </th>

                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Outstanding
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

              {/* TABLE BODY */}

              <tbody>

                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70"
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                            {getInitials(customer.name)}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-900">
                              {customer.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {customer.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {customer.phone}
                      </td>

                      {/* INVOICES */}

                      <td className="px-6 py-4">

                        <span className="text-sm font-medium">
                          {customer.invoices}
                        </span>

                      </td>

                      {/* TOTAL SPENT */}

                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {formatCurrency(
                          customer.totalSpent
                        )}
                      </td>

                      {/* OUTSTANDING */}

                      <td className="px-6 py-4">

                        <span
                          className={`text-sm font-medium ${
                            customer.outstanding > 0
                              ? "text-rose-600"
                              : "text-slate-600"
                          }`}
                        >
                          {formatCurrency(
                            customer.outstanding
                          )}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            customer.status ===
                            "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {customer.status}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-4 text-right">

                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal
                            size={18}
                          />
                        </button>

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center"
                    >

                      <p className="text-sm font-medium text-slate-700">
                        No customers found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search or
                        filter.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              TABLE FOOTER
          ================================================== */}

          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredCustomers.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {customers.length}
              </span>{" "}
              customers
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50"
              >
                Previous
              </button>

              <button
                type="button"
                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white"
              >
                1
              </button>

              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                2
              </button>

              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}