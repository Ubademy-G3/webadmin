import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,
} from 'recharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Transactions() {
  const theme = useTheme();

  const [metrics, setMetrics] = React.useState(null);
  const [payments, setPayments] = React.useState(null);
  const [moneyData, setMoneyData] = React.useState(null);
  const [transactionsData, setTransactionsData] = React.useState(null);

  function createMoneyData(pays) {
    let d = [];
    const p = Object.entries(pays);
    d = p.map((payment) => ({ time: payment[0], amount: payment[1].total_money_sent }));
    setMoneyData(d);
  }

  function createTransactionsData(pays) {
    let d = [];
    const p = Object.entries(pays);
    d = p.map((payment) => ({ time: payment[0], amount: payment[1].amount_transactions }));
    setTransactionsData(d);
  }

  React.useEffect(() => {
    axios.get('https://staging-api-gateway-app-v2.herokuapp.com/metrics/payments/', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((d) => {
        setMetrics(d);
        createMoneyData(d);
        createTransactionsData(d);
        console.log(d);
      });
    axios.get('https://staging-api-gateway-app-v2.herokuapp.com/deposits', { headers: { authorization: localStorage.getItem('token') } })
      .then((results) => results.data)
      .then((d) => {
        setPayments(d);
        console.log(d);
      });
  }, []);

  const getCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    const iso = date.toISOString().match(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/);

    return `${iso[1]} ${iso[2]}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography component="p" variant="h4">
        Transactions
      </Typography>
      {metrics && moneyData && (
        <ResponsiveContainer width="99%" height={300}>
          <LineChart
            data={moneyData}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Deposits (ETH)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      {metrics && transactionsData && (
        <ResponsiveContainer width="99%" height={300}>
          <LineChart
            data={transactionsData}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Transactions
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      {payments && (
        <TableContainer component={Paper} style={{ marginTop: 50 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sender Address</TableCell>
                <TableCell align="right">Amount Sent</TableCell>
                <TableCell align="right">Hash</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.sender_address}
                  </TableCell>
                  <TableCell align="right">{row.amount_sent}</TableCell>
                  <TableCell align="right">{row.tx_hash}</TableCell>
                  <TableCell align="right">{getCreatedAt(row.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
