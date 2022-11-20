import React, { useState } from 'react';
import Button from './Button';

const ConfigModal = ({ setDeadlineMinutes, deadlineMinutes, setSlippageAmount, slippageAmount, setShowModal }) => {
  const [first, setfirst] = useState('');

  return (
    <div className="absolute z-10 bg-nft-black-1 w-43.3 p-4 border rounded-2xl font-poppins mt-28">
      <h1 className="flexCenter font-bold text-xl mb-6">Transaction Settings</h1>
      <div className="flex my-2">
        <h2 className="w-1/3">Slippage Tolerance</h2>
        <div className="flex-1 flex justify-between">
          <input
            className="outline-none rounded-xl p-1 border bg-white text-nft-black-1 text-sm ml-32 w-57 text-center"
            type="number"
            min="0"
            placeholder="2.0%"
            value={slippageAmount}
            onChange={(e) => setSlippageAmount(e.target.value)}
          />
          <p className="font-semibold ml-6">%</p>
        </div>
      </div>
      <div className="flex my-2">
        <h2 className="w-1/3">Transaction deadline</h2>
        <div className="flex-1 flex justify-between">
          <input
            className="outline-none rounded-xl p-1 border bg-white text-nft-black-1 text-sm ml-32 w-57 text-center"
            type="number"
            min="0"
            placeholder="10"
            value={deadlineMinutes}
            onChange={(e) => setDeadlineMinutes(e.target.value)}
          />
          <p className="font-semibold">minutes</p>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <Button btnName="Ok" classStyle="rounded-2xl nft-gradient w-1/3" handleClick={() => setShowModal((prev) => !prev)} />
        <Button btnName="Cancel" classStyle="rounded-2xl border w-1/3" handleClick={() => setShowModal((prev) => !prev)} />
      </div>
    </div>
  );
};

export default ConfigModal;
