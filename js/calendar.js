/**
 * 公历转农历 年、月、日、时
 * calendar.solar2lunar(1987,11,01,01)
 */
var calendar = {

  /**

   * 农历1900-2100的润大小信息表

   * @Array Of Property

   * @return Hex

   */

  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909

    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919

    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929

    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939

    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949

    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959

    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969

    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979

    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989

    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999

    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009

    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019

    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029

    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039

    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049

    /**Add By JJonline@JJonline.Cn**/

    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059

    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069

    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079

    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089

    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099

    0x0d520],//2100

  /**

   * 公历每个月份的天数普通表

   * @Array Of Property

   * @return Number

   */

  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**

   * 天干地支之天干速查表

   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]

   * @return Cn string

   */

  Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

  /**

   * 天干地支之地支速查表

   * @Array Of Property

   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]

   * @return Cn string

   */

  Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],
  /**

   * 天干地支之地支速查表<=>生肖

   * @Array Of Property

   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]

   * @return Cn string

   */

  Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

  /**

   * 24节气速查表

   * @Array Of Property

   * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]

   * @return Cn string

   */

  solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

  /**

   * 1900-2100各年的24节气日期速查表

   * @Array Of Property

   * @return 0x string For splice

   */

  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',

    '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

    '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',

    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',

    'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',

    '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',

    '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',

    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',

    '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',

    '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

    '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',

    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',

    '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

    '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',

    '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',

    '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

    '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',

    '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

    '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

    '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',

    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

    '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

    '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

    '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',

    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

    '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

    '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

    '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

    '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

    '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

    '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

    '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

    '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',

    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',

    '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

    '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',

    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

    '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',

    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

    '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',

    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',

    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',

    '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

    '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',

    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',

    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',

    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',

    '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',

    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',

    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',

    '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

    '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',

    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**

   * 数字转中文速查表

   * @Array Of Property

   * @trans ['日','一','二','三','四','五','六','七','八','九','十']

   * @return Cn string

   */

  nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

  /**

   * 日期转农历称呼速查表

   * @Array Of Property

   * @trans ['初','十','廿','卅']

   * @return Cn string

   */

  nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

  /**

   * 月份转农历称呼速查表

   * @Array Of Property

   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']

   * @return Cn string

   */

  nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

  /**

   * 返回农历y年一整年的总天数

   * @param lunar Year

   * @return Number

   * @eg:var count = calendar.lYearDays(1987) ;//count=387

   */

  lYearDays: function (y) {

    var i, sum = 348;

    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
    }

    return (sum + calendar.leapDays(y));

  },

  /**

   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0

   * @param lunar Year

   * @return Number (0-12)

   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6

   */

  leapMonth: function (y) { //闰字编码 \u95f0

    return (calendar.lunarInfo[y - 1900] & 0xf);

  },

  /**

   * 返回农历y年闰月的天数 若该年没有闰月则返回0

   * @param lunar Year

   * @return Number (0、29、30)

   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29

   */

  leapDays: function (y) {

    if (calendar.leapMonth(y)) {

      return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);

    }

    return (0);

  },

  /**

   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法

   * @param lunar Year

   * @return Number (-1、29、30)

   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29

   */

  monthDays: function (y, m) {

    if (m > 12 || m < 1) {
      return -1
    }//月份参数从1至12，参数错误返回-1

    return ((calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);

  },

  /**

   * 返回公历(!)y年m月的天数

   * @param solar Year

   * @return Number (-1、28、29、30、31)

   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30

   */

  solarDays: function (y, m) {

    if (m > 12 || m < 1) {
      return -1
    } //若参数错误 返回-1

    var ms = m - 1;

    if (ms == 1) { //2月份的闰平规律测算后确认返回28或29

      return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);

    } else {

      return (calendar.solarMonth[ms]);

    }

  },

  /**

   * 农历年份转换为干支纪年

   * @param lYear 农历年的年份数

   * @return Cn string

   */

  toGanZhiYear: function (lYear) {

    var ganKey = (lYear - 3) % 10;

    var zhiKey = (lYear - 3) % 12;

    if (ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干

    if (zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支

    return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];

  },

  /**

   * 公历月、日判断所属星座

   * @param cMonth [description]

   * @param cDay [description]

   * @return Cn string

   */

  toAstro: function (cMonth, cDay) {

    var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";

    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];

    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";//座

  },

  /**

   * 传入offset偏移量返回干支

   * @param offset 相对甲子的偏移量

   * @return Cn string

   */

  toGanZhi: function (offset) {

    return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];

  },

  /**

   * 传入offset偏移量返回地支

   * @param offset 相对子的偏移量

   * @return Cn hour

   */
  toDiZhi: function (offset) {
    return calendar.Zhi[offset % 12]
  },
  /**

   * 传入公历(!)y年获得该年第n个节气的公历日期

   * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起

   * @return day Number

   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春

   */

  getTerm: function (y, n) {

    if (y < 1900 || y > 2100) {
      return -1;
    }

    if (n < 1 || n > 24) {
      return -1;
    }

    var _table = calendar.sTermInfo[y - 1900];

    var _info = [

      parseInt('0x' + _table.substr(0, 5)).toString(),

      parseInt('0x' + _table.substr(5, 5)).toString(),

      parseInt('0x' + _table.substr(10, 5)).toString(),

      parseInt('0x' + _table.substr(15, 5)).toString(),

      parseInt('0x' + _table.substr(20, 5)).toString(),

      parseInt('0x' + _table.substr(25, 5)).toString()

    ];

    var _calday = [

      _info[0].substr(0, 1),

      _info[0].substr(1, 2),

      _info[0].substr(3, 1),

      _info[0].substr(4, 2),

      _info[1].substr(0, 1),

      _info[1].substr(1, 2),

      _info[1].substr(3, 1),

      _info[1].substr(4, 2),

      _info[2].substr(0, 1),

      _info[2].substr(1, 2),

      _info[2].substr(3, 1),

      _info[2].substr(4, 2),

      _info[3].substr(0, 1),

      _info[3].substr(1, 2),

      _info[3].substr(3, 1),

      _info[3].substr(4, 2),

      _info[4].substr(0, 1),

      _info[4].substr(1, 2),

      _info[4].substr(3, 1),

      _info[4].substr(4, 2),

      _info[5].substr(0, 1),

      _info[5].substr(1, 2),

      _info[5].substr(3, 1),

      _info[5].substr(4, 2),

    ];

    return parseInt(_calday[n - 1]);

  },

  /**

   * 传入农历数字月份返回汉语通俗表示法

   * @param lunar month

   * @return Cn string

   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'

   */

  toChinaMonth: function (m) { // 月 => \u6708

    if (m > 12 || m < 1) {
      return -1
    } //若参数错误 返回-1

    var s = calendar.nStr3[m - 1];

    s += "\u6708";//加上月字

    return s;

  },

  /**

   * 传入农历日期数字返回汉字表示法

   * @param lunar day

   * @return Cn string

   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'

   */

  toChinaDay: function (d) { //日 => \u65e5

    var s;

    switch (d) {

      case 10:

        s = '\u521d\u5341';
        break;

      case 20:

        s = '\u4e8c\u5341';
        break;

        break;

      case 30:

        s = '\u4e09\u5341';
        break;

        break;

      default :

        s = calendar.nStr2[Math.floor(d / 10)];

        s += calendar.nStr1[d % 10];

    }

    return (s);

  },

  /**

   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”

   * @param y year

   * @return Cn string

   * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'

   */

  getAnimal: function (y) {

    return calendar.Animals[(y - 4) % 12]

  },

  /**

   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

   * @param y solar year

   * @param m solar month

   * @param d solar day
   *
   * @param h solar hour

   * @return JSON object

   * @eg:console.log(calendar.solar2lunar(1987,11,01,01));

   */

  solar2lunar: function (y, m, d, h) { //参数区间1900.1.31~2100.12.31

    if (y < 1900 || y > 2100) {
      return -1;
    }//年份限定、上限

    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }//下限

    if (!y) { //未传参 获得当天

      var objDate = new Date();

    } else {

      var objDate = new Date(y, parseInt(m) - 1, d)

    }

    var i, leap = 0, temp = 0;

    //修正ymd参数

    var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();

    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = calendar.lYearDays(i);
      offset -= temp;
    }

    if (offset < 0) {
      offset += temp;
      i--;
    }

    //是否今天

    var isTodayObj = new Date(), isToday = false;

    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {

      isToday = true;

    }

    //星期几

    var nWeek = objDate.getDay(), cWeek = calendar.nStr1[nWeek];

    if (nWeek == 0) {
      nWeek = 7;
    }//数字表示周几顺应天朝周一开始的惯例

    //农历年

    var year = i;

    var leap = calendar.leapMonth(i); //闰哪个月

    var isLeap = false;

    //效验闰月

    for (i = 1; i < 13 && offset > 0; i++) {

      //闰月

      if (leap > 0 && i == (leap + 1) && isLeap == false) {

        --i;

        isLeap = true;
        temp = calendar.leapDays(year); //计算农历闰月天数

      } else {

        temp = calendar.monthDays(year, i);//计算农历普通月天数

      }

      //解除闰月

      if (isLeap == true && i == (leap + 1)) {
        isLeap = false;
      }

      offset -= temp;

    }

    if (offset == 0 && leap > 0 && i == leap + 1)

      if (isLeap) {

        isLeap = false;

      } else {

        isLeap = true;
        --i;

      }

    if (offset < 0) {
      offset += temp;
      --i;
    }

    //农历月

    var month = i;

    //农历日

    var day = offset + 1;

    //天干地支处理

    var sm = m - 1;

    var gzY = calendar.toGanZhiYear(year);

    //月柱 1900年1月小寒以前为 丙子月(60进制12)

    var firstNode = calendar.getTerm(year, (m * 2 - 1));//返回当月「节」为几日开始

    var secondNode = calendar.getTerm(year, (m * 2));//返回当月「节」为几日开始

    //依据12节气修正干支月

    var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);

    if (d >= firstNode) {

      gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);

    }

    //传入的日期的节气与否

    var isTerm = false;

    var Term = null;

    if (firstNode == d) {

      isTerm = true;

      Term = calendar.solarTerm[m * 2 - 2];

    }

    if (secondNode == d) {

      isTerm = true;

      Term = calendar.solarTerm[m * 2 - 1];

    }

    //日柱 当月一日与 1900/1/1 相差天数

    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

    var gzD = calendar.toGanZhi(dayCyclical + d - 1);

    var gzH = calendar.toDiZhi(Math.floor((h + 1) / 2));

    //该日期所属的星座

    var astro = calendar.toAstro(m, d);

    return {
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'Animal': calendar.getAnimal(year),
      'IMonthCn': (isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month),
      'IDayCn': calendar.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'cHour': h,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'gzHour': gzH + "\u65F6",
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661f\u671f" + cWeek,
      'isTerm': isTerm,
      'Term': Term,
      'astro': astro
    };

  },

  /**

   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON

   * @param y lunar year

   * @param m lunar month

   * @param d lunar day

   * @param isLeapMonth lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]

   * @return JSON object

   * @eg:console.log(calendar.lunar2solar(1987,9,10));

   */

  lunar2solar: function (y, m, d, isLeapMonth) {  //参数区间1900.1.31~2100.12.1

    var isLeapMonth = !!isLeapMonth;

    var leapOffset = 0;

    var leapMonth = calendar.leapMonth(y);

    var leapDay = calendar.leapDays(y);

    if (isLeapMonth && (leapMonth != m)) {
      return -1;
    }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
      return -1;
    }//超出了最大极限值

    var day = calendar.monthDays(y, m);

    var _day = day;

    //bugFix 2016-9-25

    //if month is leap, _day use leapDays method

    if (isLeapMonth) {

      _day = calendar.leapDays(y, m);

    }

    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    }//参数合法性效验

    //计算农历的时间差

    var offset = 0;

    for (var i = 1900; i < y; i++) {

      offset += calendar.lYearDays(i);

    }

    var leap = 0, isAdd = false;

    for (var i = 1; i < m; i++) {

      leap = calendar.leapMonth(y);

      if (!isAdd) {//处理闰月

        if (leap <= i && leap > 0) {

          offset += calendar.leapDays(y);
          isAdd = true;

        }

      }

      offset += calendar.monthDays(y, i);

    }

    //转换闰月农历 需补充该年闰月的前一个月的时差

    if (isLeapMonth) {
      offset += day;
    }

    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)

    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);

    var calObj = new Date((offset + d - 31) * 86400000 + stmap);

    var cY = calObj.getUTCFullYear();

    var cM = calObj.getUTCMonth() + 1;

    var cD = calObj.getUTCDate();

    return calendar.solar2lunar(cY, cM, cD);

  }
};

var liuyao = {

  /**

   * 天干地支之天干速查表

   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]

   * @return Cn string

   */

  TianGan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

  GanWuxing: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],
  /**

   * 天干地支之地支速查表

   * @Array Of Property

   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]

   * @return Cn string

   */

  DiZhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

  ZhiWuxing: ["\u6c34", "\u571f", "\u6728", "\u6728", "\u571f", "\u706b", "\u706b", "\u571f", "\u91d1", "\u91d1", "\u571f", "\u6c34"],

  /**
   * 五行生成顺序速查表<=>五行
   * @Array Of Property
   * @trans["木","火","土","金","水"]
   * @return Cn string
   */
  WuXing: ["\u6728", "\u706b", "\u571f", "\u91d1", "\u6c34"],

  BaGua: [0b111, 0b001, 0b010, 0b100, 0b000, 0b110, 0b101, 0b011],

  /**
   * 八卦速查表<=>八卦
   * @Array Of Property
   * @trans["乾","震","坎","艮","坤","巽","离","兑"]
   * @return Cn string
   */
  BaGuaName: ["\u4e7e", "\u9707", "\u574e", "\u826e", "\u5764", "\u5dfd", "\u79bb", "\u5151"],

  /**
   * 八卦象速查表<=>八卦象
   * @Array Of Property
   * @trans["天","雷","水","山","地","风","火","泽"]
   * @return Cn string
   */
  BaGuaXiang: ["\u5929", "\u96f7", "\u6c34", "\u5c71", "\u5730", "\u98ce", "\u706b", "\u6cfd"],

  /**
   * 八卦属性速查表<=>八卦属性
   * @Array Of Property
   * @trans["金","木","水","土","土","木","火","金"]
   * @return Cn string
   */
  BaGuaWuxing: ["\u91d1", "\u6728", "\u6c34", "\u571f", "\u571f", "\u6728", "\u706b", "\u91d1"],

  NeiGuaTianGan: ["\u7532", "\u5e9a", "\u620a", "\u4e19", "\u4e59", "\u8f9b", "\u5df1", "\u4e01"],
  WaiGuaTianGan: ["\u58ec", "\u5e9a", "\u620a", "\u4e19", "\u7678", "\u8f9b", "\u5df1", "\u4e01"],

  NeiGuaFirstDiZhi: ["\u5b50", "\u5b50", "\u5bc5", "\u8fb0", "\u672a", "\u4e11", "\u536f", "\u5df3"],
  WaiGuaFirstDiZhi: ["\u5348", "\u5348", "\u7533", "\u620c", "\u4e11", "\u672a", "\u9149", "\u4ea5"],
  /**
   * 十二长生速查表<=>长生
   * @Array Of Property
   * @trans["长生","沐浴","冠带","临官","帝旺","衰","病","死","墓","绝","胎","养"]
   * @return Cn string
   */
  ChangSheng: ["\u957f\u751f", "\u6c90\u6d74", "\u51a0\u5e26", "\u4e34\u5b98", "\u5e1d\u65fa", "\u8870", "\u75c5", "\u6b7b", "\u5893", "\u7edd", "\u80ce", "\u517b"],

  /**
   * 六神速查表<=>六神
   * @Array Of Property
   * @trans["青龙","朱雀","勾陈","腾蛇","白虎","玄武"]
   * @return Cn string
   */
  LiuShen: ["\u9752\u9f99", "\u6731\u96c0", "\u52fe\u9648", "\u817e\u86c7", "\u767d\u864e", "\u7384\u6b66"],

  /**
   * 六亲速查表<=>六亲
   * @Array Of Property
   * @trans["父母","兄弟","子孙","妻财","官鬼"]
   * @return Cn string
   */
  LiuQin: ["\u7236\u6bcd", "\u5144\u5f1f", "\u5b50\u5b59", "\u59bb\u8d22", "\u5b98\u9b3c"],

  /**
   * 六十四卦名速查表，最右为初爻，1为阳，0为阴
   * 乾内甲子外壬午 震内庚子外庚午 坎内戊寅外戊申 艮内丙辰外丙戌
   * 坤内乙未外癸丑 巽内辛丑外辛未 离内已卯外己酉 兑内丁巳外丁亥
   * 天同二世天异五 地同四世地异初 本宫六世三世异 游魂于四归于三
   * 世在内卦外卦为卦宫，世在外卦内卦全变为卦宫
   * 三合（长生帝旺入墓） 申子辰 亥卯未 寅午戌 巳酉丑
   * 三刑 子卯 寅巳申 丑未戌 辰午酉亥
   * @Map Of Property
   * @return Cn string
   */
  GuaDict: new Map([[0b111111, "\u4e7e\u4e3a\u5929"], [0b111110, "\u5929\u98ce\u59e4"], [0b111100, "\u5929\u5c71\u9041"], [0b111000, "\u5929\u5730\u5426"], [0b110000, "\u98ce\u5730\u89c2"], [0b100000, "\u5c71\u5730\u5265"], [0b101000, "\u706b\u5730\u664b"], [0b101111, "\u706b\u5929\u5927\u6709"],

    [0b001001, "\u9707\u4e3a\u96f7"], [0b001000, "\u96f7\u5730\u8c6b"], [0b001010, "\u96f7\u6c34\u89e3"], [0b001110, "\u96f7\u98ce\u6052"], [0b000110, "\u5730\u98ce\u5347"], [0b010110, "\u6c34\u98ce\u4e95"], [0b011110, "\u6cfd\u98ce\u5927\u8fc7"], [0b011001, "\u6cfd\u96f7\u968f"],

    [0b010010, "\u574e\u4e3a\u6c34"], [0b010011, "\u6c34\u6cfd\u8282"], [0b010001, "\u6c34\u96f7\u5c6f"], [0b010101, "\u6c34\u706b\u65e2\u6d4e"], [0b011101, "\u6cfd\u706b\u9769"], [0b001101, "\u96f7\u706b\u4e30"], [0b000101, "\u5730\u706b\u660e\u5937"], [0b000010, "\u5730\u6c34\u5e08"],

    [0b100100, "\u826e\u4e3a\u5c71"], [0b100101, "\u5c71\u706b\u8d32"], [0b100111, "\u5c71\u5929\u5927\u755c"], [0b100011, "\u5c71\u6cfd\u635f"], [0b101011, "\u706b\u6cfd\u777d"], [0b111011, "\u5929\u6cfd\u5c65"], [0b110011, "\u98ce\u6cfd\u4e2d\u5b5a"], [0b110100, "\u98ce\u5c71\u6e10"],

    [0b000000, "\u5764\u4e3a\u5730"], [0b000001, "\u5730\u96f7\u590d"], [0b000011, "\u5730\u6cfd\u4e34"], [0b000111, "\u5730\u5929\u6cf0"], [0b001111, "\u96f7\u5929\u5927\u58ee"], [0b011111, "\u6cfd\u5929\u592c"], [0b010111, "\u6c34\u5929\u9700"], [0b010000, "\u6c34\u5730\u6bd4"],

    [0b110110, "\u5dfd\u4e3a\u98ce"], [0b110111, "\u98ce\u5929\u5c0f\u755c"], [0b110101, "\u98ce\u706b\u5bb6\u4eba"], [0b110001, "\u98ce\u96f7\u76ca"], [0b111001, "\u5929\u96f7\u65e0\u5984"], [0b101001, "\u706b\u96f7\u566c\u55d1"], [0b100001, "\u5c71\u96f7\u9890"], [0b100110, "\u5c71\u98ce\u86ca"],

    [0b101101, "\u79bb\u4e3a\u706b"], [0b101100, "\u706b\u5c71\u65c5"], [0b101110, "\u706b\u98ce\u9f0e"], [0b101010, "\u706b\u6c34\u672a\u6d4e"], [0b100010, "\u5c71\u6c34\u8499"], [0b110010, "\u98ce\u6c34\u6da3"], [0b111010, "\u5929\u6c34\u8bbc"], [0b111101, "\u5929\u706b\u540c\u4eba"],

    [0b011011, "\u5151\u4e3a\u6cfd"], [0b011010, "\u6cfd\u6c34\u56f0"], [0b011000, "\u6cfd\u5730\u8403"], [0b011100, "\u6cfd\u5c71\u54b8"], [0b010100, "\u6c34\u5c71\u8e47"], [0b000100, "\u5730\u5c71\u8c26"], [0b001100, "\u96f7\u5c71\u5c0f\u8fc7"], [0b001011, "\u96f7\u6cfd\u5f52\u59b9"],]),

  /**
   * 随机取数，正为3，反为2,从左向右是每组先后顺序
   * GetGuaRandom return示例 [[2,3,3],[2,3,3],[2,3,3],[2,3,3],[2,3,3],[2,3,3]]
   */
  GetGuaRandom: function () {
    const guaArray = [];
    for (let i = 0; i < 6; i++) {
      const yaoArray = [];
      for (let j = 0; j < 3; j++) {
        yaoArray[j] = Math.random() >= 0.5 ? 3 : 2; // 随机加3或2
      }
      guaArray[i] = yaoArray;
    }
    return guaArray;
  },

  /**
   * 获取一个六爻，可使用GetGuaRandom获取参数
   * console.log(liuyao.GetGua(liuyao.GetGuaRandom()))
   * console.log(liuyao.GetGua([[2,3,3],[2,3,3],[2,3,3],[2,3,3],[2,3,3],[2,3,3]]))
   */
  GetGua: function (guaArray) {
    let guaKeyArray = liuyao.GetGuaKey(guaArray);
    let guaItem = liuyao.GetGuaItem(guaKeyArray);
    let result = {
      "name": guaItem.length > 1 ? guaItem[0].name + ' ' + guaItem[1].name : guaItem[0].name, "guaItem": guaItem,
    };
    return result
  },

  GetGuaKey: function (guaArray) {
    let bengua = 0;
    let biangua = 0;
    //从低位向高位装
    for (let i = 0; i < guaArray.length; i++) {
      let yao = 0;
      let yaoArray = guaArray[i];
      for (let j = 0; j < yaoArray.length; j++) {
        yao += yaoArray[j];
      }
      if (yao % 2 === 0) {
        bengua |= 0 << i;
        biangua |= yao === 6 ? 1 << i : 0 << i;
      } else {
        bengua |= 1 << i;
        biangua |= yao === 9 ? 0 << i : 1 << i;
      }
    }
    let guaKeyArray = bengua !== biangua ? [bengua, biangua] : [bengua];
    return guaKeyArray;
  },

  GetGuaItem: function (guaKeyArray) {
    const guaItemArray = [];

    for (let i = 0; i < guaKeyArray.length; i++) {
      let guaKey = guaKeyArray[i];
      let guaDictKeys = Array.from(liuyao.GuaDict.keys());
      let guaIndex = guaDictKeys.indexOf(guaKey);
      let guaGroupIndex = guaIndex % 8;
      let guaDiZhiArray = liuyao.GetGuaDiZhi(guaKey);
      let guaWuXingArray = liuyao.GetGuaWuXing(guaDiZhiArray);
      let benGongKey = guaDictKeys[guaIndex - guaGroupIndex];
      let benGongWuXing = liuyao.BaGuaWuxing[liuyao.BaGua.indexOf(benGongKey & 0b111)];
      let shiIndex = liuyao.GetShi(guaKey, guaGroupIndex === 0, guaGroupIndex === 6, guaGroupIndex === 7);
      let liuQinArray = liuyao.GetLiuQin(guaWuXingArray, benGongWuXing);
      let fuShenArray = liuyao.GetFuShen(liuQinArray, benGongKey);
      const guaItemObj = {
        "key": guaKey.toString(2).padStart(6, '0'),
        "groupIndex": guaGroupIndex + 1,
        "name": liuyao.GuaDict.get(guaKey),
        "tianGan": liuyao.GetGuaTianGan(guaKey),
        "diZhi": guaDiZhiArray,
        "wuXing": guaWuXingArray,
        "liuQin": liuQinArray,
        "shiIndex": i !== 0 ? undefined : shiIndex,
        "yingIndex": i !== 0 ? undefined : (shiIndex + 2) % 6,
        "benGongKey": i !== 0 ? undefined : benGongKey.toString(2).padStart(6, '0'),
        "benGongName": i !== 0 ? undefined : liuyao.GuaDict.get(benGongKey),
        "benGongWuXing": i !== 0 ? undefined : benGongWuXing,
        "benGongDiZhi": i !== 0 ? undefined : liuyao.GetGuaDiZhi(benGongKey),
        "fuShen": i !== 0 ? undefined : fuShenArray,
        "isFuShen": i !== 0 ? undefined : !fuShenArray.every(item => item === undefined),
        "isBenGong": guaGroupIndex === 0,
        "isLiuChong": guaGroupIndex === 0 || guaKey === 0b111001 || guaKey === 0b001111,
        "isLiuHe": guaGroupIndex === 1,
        "isYouHun": guaGroupIndex === 6,
        "isGuiHun": guaGroupIndex === 7,
      }
      guaItemArray[i] = guaItemObj
    }
    return guaItemArray;
  },

  GetGuaTianGan: function (guaKey) {
    let neiGua = guaKey & 0b111;
    let waiGua = (guaKey >> 3) & 0b111;
    let neiGuaTianGan = liuyao.NeiGuaTianGan[liuyao.BaGua.indexOf(neiGua)];
    let waiGuaTianGan = liuyao.WaiGuaTianGan[liuyao.BaGua.indexOf(waiGua)];

    return [waiGuaTianGan, waiGuaTianGan, waiGuaTianGan,neiGuaTianGan, neiGuaTianGan, neiGuaTianGan ]
  },

  GetGuaDiZhi: function (guaKey) {
    let neiGua = guaKey & 0b111;
    let waiGua = (guaKey >> 3) & 0b111;
    let neiGuaIndex = liuyao.BaGua.indexOf(neiGua);
    let waiGuaIndex = liuyao.BaGua.indexOf(waiGua);
    let neiGuaFirstDiZhi = liuyao.NeiGuaFirstDiZhi[neiGuaIndex];
    let waiGuaFirstDiZhi = liuyao.WaiGuaFirstDiZhi[waiGuaIndex];
    let neiGuaFirstDiZhiIndex = liuyao.DiZhi.indexOf(neiGuaFirstDiZhi);
    let waiGuaFirstDiZhiIndex = liuyao.DiZhi.indexOf(waiGuaFirstDiZhi);

    return [
      waiGuaIndex <= 3 ? liuyao.DiZhi[(waiGuaFirstDiZhiIndex + 4) % 12] : liuyao.DiZhi[((waiGuaFirstDiZhiIndex - 4) > 0 ? (waiGuaFirstDiZhiIndex - 4) : (12 + waiGuaFirstDiZhiIndex - 4)) % 12],
      waiGuaIndex <= 3 ? liuyao.DiZhi[(waiGuaFirstDiZhiIndex + 2) % 12] : liuyao.DiZhi[((waiGuaFirstDiZhiIndex - 2) > 0 ? (waiGuaFirstDiZhiIndex - 2) : (12 + waiGuaFirstDiZhiIndex - 2)) % 12],
      waiGuaFirstDiZhi,
      neiGuaIndex <= 3 ? liuyao.DiZhi[(neiGuaFirstDiZhiIndex + 4) % 12] : liuyao.DiZhi[((neiGuaFirstDiZhiIndex - 4) > 0 ? (neiGuaFirstDiZhiIndex - 4) : (12 + neiGuaFirstDiZhiIndex - 4)) % 12],
      neiGuaIndex <= 3 ? liuyao.DiZhi[(neiGuaFirstDiZhiIndex + 2) % 12] : liuyao.DiZhi[((neiGuaFirstDiZhiIndex - 2) > 0 ? (neiGuaFirstDiZhiIndex - 2) : (12 + neiGuaFirstDiZhiIndex - 2)) % 12],
      neiGuaFirstDiZhi,
     ];
  },

  GetGuaWuXing: function (guaDiZhi) {
    return [
      liuyao.ZhiWuxing[liuyao.DiZhi.indexOf(guaDiZhi[0])],
      liuyao.ZhiWuxing[liuyao.DiZhi.indexOf(guaDiZhi[1])],
      liuyao.ZhiWuxing[liuyao.DiZhi.indexOf(guaDiZhi[2])],
      liuyao.ZhiWuxing[liuyao.DiZhi.indexOf(guaDiZhi[3])],
      liuyao.ZhiWuxing[liuyao.DiZhi.indexOf(guaDiZhi[4])],
      liuyao.ZhiWuxing[liuyao.DiZhi.indexOf(guaDiZhi[5])]]
  },

  GetLiuQin: function (guaWuXing, benGongWuXing) {
    let benGongWuXingIndex = liuyao.WuXing.indexOf(benGongWuXing);
    const liuQinArray = []
    for (let i = 0; i < guaWuXing.length; i++) {
      let yaoWuXingIndex = liuyao.WuXing.indexOf(guaWuXing[i]);
      let offset = (yaoWuXingIndex - benGongWuXingIndex + 5) % 5;
      liuQinArray[i] = liuyao.LiuQin[(offset + 1) % 5];
    }
    return liuQinArray;
  },

  GetShi: function (guaKey, isBenGong, isYouHun, isGuiHun) {
    if (isBenGong) {
      return 6
    }
    if (isYouHun) {
      return 4
    }
    if (isGuiHun) {
      return 3
    }
    let neiGua = guaKey & 0b111;
    let waiGua = (guaKey >> 3) & 0b111;

    let isTianTong = (neiGua >> 2) & 0b1 === (waiGua >> 2) & 0b1;
    let isRenTong = (neiGua >> 1) & 0b1 === (waiGua >> 1) & 0b1;
    let isDiTong = neiGua & 0b1 === waiGua & 0b1;

    if (!isTianTong && !isRenTong && !isDiTong) {
      return 3
    }

    if (isTianTong && !isRenTong && !isDiTong) {
      return 2
    } else if (!isTianTong && isRenTong && isDiTong) {
      return 5
    }
    if (!isTianTong && !isRenTong && isDiTong) {
      return 4
    } else if (isTianTong && isRenTong && !isDiTong) {
      return 1
    }
  },

  GetFuShen: function (liuQinArray, benGongKey) {
    const fuShenArray = [];
    let benGongGuaWuXing = liuyao.BaGuaWuxing[liuyao.BaGua.indexOf(benGongKey & 0b111)]
    let benGongLiuQin = liuyao.GetLiuQin(liuyao.GetGuaWuXing(liuyao.GetGuaDiZhi(benGongKey)), benGongGuaWuXing);
    for (let i = 0; i < benGongLiuQin.length; i++) {
      if (liuQinArray.indexOf(benGongLiuQin[i]) === -1) {
        fuShenArray[i] = benGongLiuQin[i];
      } else {
        fuShenArray[i] = undefined;
      }
    }
    return fuShenArray
  }
};
