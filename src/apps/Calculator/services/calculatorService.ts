
export const calculatorService = {
    getButtonClass: (btn: string) => {
        if (btn === "=") return "btn-equals";
        if (["AC", "C", "%"].includes(btn)) return "btn-function";
        if (["+", "-", "*", "/", "+/-", "(", ")", "."].includes(btn)) return "btn-operator";
        return "btn-number";
    }
}