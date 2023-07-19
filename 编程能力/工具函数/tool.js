
// 生成数组
const createArr = (n) => new Array(n).fill(0)

// 手机号格式化 将手机号码格式化成 xxx-xxxx-xxxx 的形式
const formatPhone = (str, sign = '-') => str.replace(/(\W|\s)/g, "").split(/^(\d{3})(\d{4})(\d{4})$/).filter(item => item).join(sign)

// 检查当前是否 IE 浏览器
const isIE = !!document.documentMode;

// 复制文本到粘贴板上
const copyText = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)

// 日期格式化 
const d = new Date()
d.toISOString()
// '2023-07-19T03:37:29.997Z'
d.toJSON()
// '2023-07-19T03:37:29.997Z'
d.toLocaleDateString()
// '2023/7/19'
d.toLocaleString()
// '2023/7/19 11:37:29'
d.toLocaleTimeString()
// '11:37:29'

//例如  YYYY-MM-DD 格式
const formatYmd = (date) => date.toISOString().slice(0, 10)
// hh:mm:ss 格式
const formatSeconds = (date) => date.toISOString().slice(11, 19)

// 截取数字 当你需要将小数点后的某些数字截断而不取四舍五入
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0]
toFixed(10.255, 2) // 10.25

// 四舍五入
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
round(10.255, 2) // 10.26

// 补零
const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero)
replenishZero(8, 2) // 08

// 等待
const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {console.log('time')});