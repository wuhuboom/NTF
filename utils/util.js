// 格式化数字 没三位加 ，
export const formatNum =  (val)=>{
	val = val.toString();
	var arrNum=val.split('').reverse().join('').replace(/(\d{3})/g,'$1,').split('').reverse().join('');
	var arrLength=arrNum.length;
	if(arrLength%4==0){
		 arrNum=arrNum.substring(1);
	}
	return arrNum
}
