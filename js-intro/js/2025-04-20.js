// 1.
function sqeare(base) {
    return base * base;
}
function sqeare(base) {
    return sqeare(base) * base;
}

// 2.
function rectangular_parallelepiped_volume(length, width, height) {
    return (length * width) * height;
}

// 3.
function pow(base, exp) {
    if(!exp == 0 && base == 0) return undefined;
    let result = 1; 
    for (let cur_exp = 1; cur_exp <= exp; ++cur_exp) {
        result *= base;
    }
}


// рекурсивный вариант
function pow_rec(base, exp) {
    if (exp == 0 && base == 0 || exp < 0) return undefined;
    if (exp == 0) return 0;
    if (base == 0 || base == 1) return base;
    return base * pow_rec(base, exp - 1)
}

// (рекурсивно) факториал числа
function factor(n) {
    if (n < 0) return;
    if (n == 0) return 1;
    return n * factor(n - 1);
}

// факториал числа (циклическая ф)
function factorCicle(n) {
    if (n < 0) return;
    let res = 1;
    for ( let i = 1; i <= n; ++i) res *= i; //res = res * i
    return res;
}