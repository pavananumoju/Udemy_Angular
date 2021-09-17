import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform{
    transform(value: any){
        if(typeof(value) === 'string' || value === ''){
            var splitString = (<string>value).split('');
            var reverseSplitString = splitString.reverse();
            var reverseString = reverseSplitString.join('');
            return reverseString;
        }
        return value
    }
}