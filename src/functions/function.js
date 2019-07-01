// replace function for replacing two array elements
export function swap(arr, idx1, idx2){
	var newArr = [...arr];
	// console.log(newArr);
	arr.forEach((v,i) => {
		if(arr.indexOf(v) === idx1){
			var val = newArr.splice(idx1, 1, arr[idx2]);
			newArr.splice(idx2,1, ...val);
		}
	})
	return newArr;
}