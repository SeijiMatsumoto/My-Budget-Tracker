interface Data {
  uid: UserData;
}

interface UserData {
  displayName: string;
  photo: string;
  transactionsData: Transaction[];
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
  labels: string[];
}

interface Category {
  type: string;
  data: string[];
}
