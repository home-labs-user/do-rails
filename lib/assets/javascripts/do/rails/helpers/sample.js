    // var
    //         self = this.copy(),
    //         i = 0,
    //         count = 0,
    //         aux;

    //     while (true) {
    //         if (count === self.length - 1) { break; }
    //         while (true) {
    //             i = count;
    //             if (self[i] > self[i + 1]) { //0, 1
    //                 aux = self[i];
    //                 self[i] = self[i + 1];
    //                 self[i + 1] = aux;
    //                 while (true) {
    //                     if (i === 0 || self[i] > self[i - 1]) { break; }
    //                     aux = self[i];
    //                     self[i] = self[i - 1];
    //                     self[i - 1] = aux;
    //                     i -= 1;
    //                 }
    //             }
    //             if (i === 0 || self[i] < self[i + 1]) {
    //                 break;
    //             }
    //         }
    //         count += 1;
    //     }

    //     return self;
