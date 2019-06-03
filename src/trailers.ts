export interface Trailer {
  id: string;
  label: string;
}

export const trailers: Trailer[] = [
  {
    id: 'S3vO8E2e6G0',
    label: 'Rocketman',
  },
  {
    id: 'QFxN2oDKk0E',
    label: 'Godzilla',
  },
  {
    id: 'TcMBFSGVi1c',
    label: 'Avengers',
  },
  {
    id: '1roy4o4tqQM',
    label: 'Pokemon',
  },
  {
    id: 'Uhd3lo_IWJc',
    label: 'Booksmart',
  },
];

export const trailerIds = trailers.map((t) => t.id).join(',');
