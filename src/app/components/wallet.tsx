// pages/wallet.tsx

const Wallet = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">My Wallet</h1>
      <div className="text-xl mb-4">Balance: ${balance}</div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 p-2 rounded mr-2"
          id="amount"
        />
      </div>

      <ul className="w-full max-w-md">
        {transactions.map((transaction, index) => (
          <li key={index} className="bg-white p-4 mb-2 shadow rounded">
            {transaction.type === "credit" ? "Credit" : "Debit"}: $
            {transaction.amount} on{" "}
            {transaction.timestamp.toDate().toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet;
