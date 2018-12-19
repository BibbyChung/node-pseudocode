import { AppHelper } from './appHelper';

const fn = async () => {
  const data = [
    {
      id: 1,
      name: 'Bibby0'
    },
    {
      id: 2,
      name: 'Bibby1'
    },
    {
      id: 3,
      name: 'Bibby2'
    },
    {
      id: 2,
      name: 'Bibby3'
    },
  ];

  const groupByArr = await AppHelper.groupBy(data, a => `${a.id}`);
  console.log(groupByArr);

  const chunkArr = await AppHelper.chunk(data, 3);
  console.log(chunkArr);
};

fn();