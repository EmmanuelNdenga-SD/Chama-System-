export default function Contributions() {
  const [contributions, setContributions] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // fetch contributions
  }, []);

  const handleAdd = async () => {
    // POST new contribution
  };

  return (
    <Box>
      <Typography variant="h4">Your Contributions</Typography>
      <TextField
        label="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button onClick={handleAdd} variant="contained">Add Contribution</Button>
      <ul>
        {contributions.map((c, i) => (
          <li key={i}>{c.amount} on {c.date}</li>
        ))}
      </ul>
    </Box>
  );
}
