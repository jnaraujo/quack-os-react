export class ReversePolishNotation{
    private static readonly operators = ['+', '-', '*', '/'];
    private static readonly precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    public static calculate(expression: string): number{
        const tokens = expression.split(' ');
        const stack = [];
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (this.isOperator(token)) {
                const b = stack.pop();
                const a = stack.pop();
                const result = this.evaluate(a, b, token);
                stack.push(result);
            } else {
                stack.push(parseFloat(token));
            }
        }
        return stack.pop();
    }

    private static isOperator(token: string): boolean {
        return this.operators.indexOf(token) !== -1;
    }

    private static evaluate(a: number, b: number, operator: string): number {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
        }
    }
}