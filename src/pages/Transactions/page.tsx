"use client";

import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { ExternalLink } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: "0.5 ETH",
    date: "2023-06-01",
    status: "Completed",
    link: "https://etherscan.io/tx/0x123",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: "1.2 ETH",
    date: "2023-05-28",
    status: "Pending",
    link: "https://etherscan.io/tx/0x456",
  },
  {
    id: 3,
    type: "Reward",
    amount: "0.1 ETH",
    date: "2023-05-25",
    status: "Completed",
    link: "https://etherscan.io/tx/0x789",
  },
  // Add more transactions as needed
];

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const getCurrentTransactions = () => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
      <h1 className="mb-6 text-2xl font-bold text-white">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-300">
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentTransactions().map((tx) => (
              <tr key={tx.id} className="border-t border-gray-700 text-white">
                <td className="py-3 pr-4">{tx.type}</td>
                <td className="py-3 pr-4">{tx.amount}</td>
                <td className="py-3 pr-4">{tx.date}</td>
                <td className="py-3 pr-4">{tx.status}</td>
                <td className="py-3">
                  <a
                    href={tx.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
