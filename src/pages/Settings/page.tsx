import React, { useState } from 'react'
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Select, SelectContent, SelectItem } from "../../components/ui/Select"

export default function SettingsPage() {
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedChain, setSelectedChain] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Wallet Address:', walletAddress)
    console.log('Selected Chain:', selectedChain)
  }

  return (
    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-lg">
      <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="wallet-address">Withdrawal Wallet Address</Label>
          <Input
            id="wallet-address"
            value={walletAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value)}
            className="mt-1 bg-white/5 text-white"
            placeholder="Enter your wallet address"
          />
        </div>
        <div>
          <Label htmlFor="chain-select">Select Chain for Withdrawal</Label>
          <Select value={selectedChain} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedChain(e.target.value)}>
            <SelectContent>
              <SelectItem value="">Select a chain</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="binance">Binance Smart Chain</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save Settings
        </button>
      </form>
    </div>
  )
}