import differenceInDays from 'date-fns/difference_in_days';
import differenceInMonths from 'date-fns/difference_in_months';
import differenceInYears from 'date-fns/difference_in_years';
import subYears from 'date-fns/sub_years';
import subMonths from 'date-fns/sub_months';
import parse from 'date-fns/parse';

import format from 'date-fns/format';
import id from 'date-fns/locale/id';

const h = new Date().toLocaleString('en-US',{timeZone: 'Asia/Brunei', year: 'numeric', month: '2-digit', day: '2-digit'}).substr(0,10);
const a = h.split('/');
const zone = a[2]+'-'+a[0]+'-'+a[1];

export default class Age {
    constructor() {

    }

    umur(u){

        const result = [];
        let now = parse(zone);
        let umur = parse(u);

        const years = differenceInYears(now, umur);
        if (years > 0) {
            result.push(`${years} Tahun`);
            now = subYears(now, years);
        }
        
        const months = differenceInMonths(now, umur);
        if (months > 0) {
            result.push(`${months} Bulan`);
            now = subMonths(now, months);
        }
        
        const days = differenceInDays(now, umur);
        if (days > 0) {
            result.push(`${days} Hari`);
        }

        return result.join(' ');
    }

    tglIndo(u){
        return format(u, 'DD MMMM YYYY', {locale: id})
    }

    rangeDate(to,from){
        const hasil = [];
        const days = differenceInDays(to, from);
        if (days >= 0) {
            hasil.push(`${days+1} Hari`);
        }

        return hasil.join(' ');
    }

    kelamin(k){
        if(k === 'L'){
            return 'Laki-laki'
        }else{
            return 'Perempuan'
        }
    }

    umurMini(u){

        const result = [];
        let now = parse(zone);
        let umur = parse(u);

        const years = differenceInYears(now, umur);
        if (years > 0) {
            result.push(`${years}T`);
            now = subYears(now, years);
        }
        
        const months = differenceInMonths(now, umur);
        if (months > 0) {
            result.push(`${months}B`);
            now = subMonths(now, months);
        }
        
        const days = differenceInDays(now, umur);
        if (days > 0) {
            result.push(`${days}H`);
        }

        return result.join(' ');
    }
}