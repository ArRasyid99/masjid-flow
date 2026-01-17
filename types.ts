
export type TransactionType = 'pemasukan' | 'pengeluaran';

export interface Transaction {
  id: string;
  tanggal: string;
  tipe: TransactionType;
  sumber_kategori: string;
  nominal: number;
  keterangan: string;
}

export interface Activity {
  id: string;
  nama: string;
  tanggal: string;
  waktu: string;
  penanggungJawab: string;
  status: 'terjadwal' | 'berjalan' | 'selesai';
}

export interface Staff {
  id: string;
  nama: string;
  jabatan: string;
  kontak: string;
  role: 'admin' | 'viewer';
}

export type ViewState = 'dashboard' | 'keuangan' | 'kegiatan' | 'pengurus';
