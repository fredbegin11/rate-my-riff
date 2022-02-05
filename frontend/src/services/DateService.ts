import { format } from 'date-fns';

class DateService {
  format(date: number, type = 'yyyy/MM/dd') {
    return date ? format(date, type) : '-';
  }
}

export default new DateService();
