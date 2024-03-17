export function SelectValue(valx){
    const sel = document.getElementById(valx);
    for(const s of sel){
        if(s.selected){
            return s.value;
        }
    }
}

