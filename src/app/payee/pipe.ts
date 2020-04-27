import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter): any {
        if (!items || !filter) {
            return items;
        }
        // console.log(items);
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => {
            const keys = Object.keys(item);
            for (const key of keys) {
                if (item[key] != null) {
                    const temp = item[key].toString().toLowerCase();
                    if (temp.indexOf(filter.name.toLowerCase()) != -1) {
                        return true;
                    }
                }
            }
        });
    }
}
