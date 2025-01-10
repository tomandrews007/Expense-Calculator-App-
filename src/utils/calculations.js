export function calculateSettlements(participants) {
  // Convert amounts to numbers and calculate total
  const total = participants.reduce((sum, p) => sum + Number(p.amount), 0)
  const average = total / participants.length

  // Calculate balances
  const balances = participants.map(p => ({
    name: p.name,
    balance: Number(p.amount) - average
  }))

  // Sort balances
  const debtors = balances.filter(b => b.balance < 0)
    .sort((a, b) => a.balance - b.balance)
  const creditors = balances.filter(b => b.balance > 0)
    .sort((a, b) => b.balance - a.balance)

  const settlements = []
  let i = 0, j = 0

  while (i < debtors.length && j < creditors.length) {
    const debt = Math.abs(debtors[i].balance)
    const credit = creditors[j].balance
    const amount = Math.min(debt, credit)

    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: Number(amount.toFixed(2))
    })

    debtors[i].balance += amount
    creditors[j].balance -= amount

    if (Math.abs(debtors[i].balance) < 0.01) i++
    if (Math.abs(creditors[j].balance) < 0.01) j++
  }

  return settlements
}
