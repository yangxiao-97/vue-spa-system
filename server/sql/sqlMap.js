const sqlMap = {
  //用户表
  admin_info: {
    // 查询所有用户、
    // 根据用户名查询用户信息、
    // 根据用户名查询token、 添加用户注册信息、
    // 根据用户名修改用户信息、
    // 根据用户名更新token、
    // 根据用户名修改用户角色权限
    queryAll: `select * from admin_info`,
    login: `select * from admin_info where admName=?`,
    loginCheck: `select token from admin_info where admName=?`,
    register: `insert into admin_info values (0,?,?,?,?,?,?)`,
    queryName: `select admName from admin_info where admName=?`,
    update: `update admin_info set admName=?,admPassword=?,admEditTime=?,token=? where admName=?`,
    updateToken: `update admin_info set token=? where admName=?`,
    updateRole: `update admin_info set role=? where admName=?`
  },
  //职员表
  employee_info: {
    // 查询所有职员信息、
    // 新增职员信息至表employee_info、
    // 根据职员ID查询职员信息或根据职员姓名模糊查询、
    // 根据职员ID删除单个职员或批量删除、
    // 根据职员ID修改职员信息
    add: `insert into employee_info
			(empNo,empName,empAge,empSex,empBirthday,empIdCard,empTel,empQQ,empAddress,empEntryDate,empState)
			 values (0,?,?,?,?,?,?,?,?,?,'就职')`,
    queryAll: `select * from employee_info`,
    queryByName: `select * from employee_info where empNo=? or empName like ?`,
    del: `delete from employee_info where empNo=?`,
    multiDel: `delete from employee_info where empNo in (?)`,
    update: `update employee_info set 
			empName=?,empAge=?,empSex=?,empBirthday=?,empIdCard=?,empTel=?,empQQ=?,empAddress=?,empEntryDate=? 
			where empNo=?`,
    pagination: `select * from employee_info limit ?,10`
  },
  //供应商表
  supplier_info: {
    // 查询所有供应商信息、
    // 新增供应商信息至表supplier_info、
    // 查询所有状态为已启用的供应商信息、
    // 根据供应商ID查询供应商信息或根据供应商姓名模糊查询、
    // 根据供应商ID删除单个供应商或批量删除、
    // 根据供应商ID批量修改供应商状态、
    // 根据供应商ID修改供应商信息、
    // 根据供应商ID修改供应商状态
    add: `insert into supplier_info 
			(supNo,supName,supLawyer,supTel,supAddress,supState) 
			values (0,?,?,?,?,'已启用')`,
    queryAll: `select * from supplier_info`,
    queryUsedSup: `select supName from supplier_info where supState='已启用'`,
    queryByName: `select * from supplier_info where supNo= ? or supName like ?`,
    del: `delete from supplier_info where supNo=?`,
    multiDel: `delete from supplier_info where supNo in (?)`,
    multiStateChange: `update supplier_info set supState=? where supNo in (?)`,
    update: `update supplier_info set supName=?,supLawyer=?,supTel=?,supAddress=? where supNo=?`,
    stateChange: `update supplier_info set supState=? where supNo=?`,
    pagination: `select * from supplier_info limit ?,10`
  },
  //商品表
  goods_info: {
    // 查询所有商品信息、
    // 新增商品至表goods_info、
    // 查询已上架商品信息、
    // 根据商品ID查询商品信息或根据商品名称、 商品分类模糊查询、
    // 根据商品ID删除单个商品或批量删除、
    // 根据商品ID修改单个商品状态或批量修改、
    // 根据商品ID修改商品信息
    add: `insert into goods_info
			values (0,?,?,?,?,?,?,?,?,?,'已上架')`,
    queryAll: `select * from goods_info`,
    queryUsedGoods: `select goodsNo,goodsName,stockPrice,goodsPrice,supName from goods_info where goodsState='已上架'`,
    queryByName: `select * from goods_info where goodsNo= ? or goodsName like ? or goodsType like ?`,
    queryById: `select goodsNo,goodsName,stockPrice,goodsPrice from goods_info where goodsNo=?`,
    del: `delete from goods_info where goodsNo=?`,
    multiDel: `delete from goods_info where goodsNo in (?)`,
    multiStateChange: `update goods_info set goodsState=? where goodsNo in (?)`,
    update: `update goods_info set goodsName=?,
			goodsType=?,goodsUnit=?,goodsModel=?,goodsSpec=?,stockPrice=?,goodsPrice=?,supName=?,goodsAddTime=? where goodsNo=?`,
    stateChange: `update goods_info set goodsState=? where goodsNo=?`,
    pagination: `select * from goods_info limit ?,10`
  },
  //商品分类表
  types: {
    // 查询所有商品分类、
    // 新增商品分类至表types、
    // 查询已启用商品分类信息、
    // 根据商品分类ID删除单个商品分类或批量删除、
    // 根据商品分类ID修改单个商品分类状态或批量修改、
    // 根据商品分类ID修改商品分类信息
    add: `insert into types
			values (0,?,?,'已启用')`,
    queryAll: `select * from types`,
    queryUsedTypes: `select goodsType from types where goodsTypeState='已启用'`,
    del: `delete from types where goodsTypeNo=?`,
    multiDel: `delete from types where goodsTypeNo in (?)`,
    multiStateChange: `update types set goodsTypeState=? where goodsTypeNo in (?)`,
    update: `update types set goodsType=? where goodsTypeNo=?`,
    stateChange: `update types set goodsTypeState=? where goodsTypeNo=?`,
  },
  //采购表
  stock: {
    // 查询所有供应商采购信息， 包括供应商名及进货价等信息、
    // 新增采购供应信息、
    // 根据商品ID修改采购信息、
    // 根据采购订单ID查询采购订单详情
    add: `insert into stock
		values (0,?,?,?,?,?,?,?,?)`,
    update: `update stock set stockCount=?,stockMoney=? where goodsNo=?`,
    queryAll: `select 
		b.stockNo,b.goodsNo,b.goodsName,b.supName,b.stockPrice,b.goodsPrice,b.stockCount,b.stockMoney,
		a.stockAddTime,a.stockState from stock_summary a join stock b on a.stockNo=b.stockNo`,
    queryByName: `select 
		b.stockNo,b.goodsNo,b.goodsName,b.supName,b.goodsPrice,b.stockCount,b.stockMoney,
		a.stockAddTime,a.stockState from stock_summary a join stock b on a.stockNo=b.stockNo where a.stockNo=? or a.stockAddTime like ?`,
    queryFetch: `select * from stock where stockNo=?`,
  },
  //采购订单表
  stock_summary: {
    // 查询所有采购订单、
    // 新增采购信息至表stock_summary、
    // 根据采购订单ID查询采购信息或根据采购订单添加时间模糊查询、
    // 根据采购订单ID修改采购信息
    // 根据采购订单ID修改采购订单状态或批量修改
    add: `insert into stock_summary values( 0,?,?,?,?,'待审核')`,
    update: `update stock_summary set stockCountSum=?,stockMoneySum=? where stockNo=?`,
    queryAll: `select * from stock_summary`,
    queryByName: `select * from stock_summary where stockNo= ? or stockAddTime like?`,
    stateChange: `update stock_summary set stockState=? where stockNo=?`,
    multiStateChange: `update stock_summary set stockState=? where stockNo in (?)`,
    pagination: `select * from stock_summary limit ?,8 `,
  },
  //采购退货订单表
  stock_return: {
    // 查询所有采购退货订单信息、
    // 根据采购退货订单ID查询采购退货订单信息或根据退货订单创建时间进行模糊查询、
    // 新增采购退货订单、
    // 根据采购退货订单ID删除该退货订单、
    // 根据采购退货订单ID修改采购退货订单状态或批量修改
    add: `insert into stock_return values (0,?,?,?,?,?,?,?,'待审核')`,
    del: `delete from stock_return where returnStockNo=?`,
    queryAll: `select * from stock_return`,
    queryByName: `select * from stock_return where returnStockNo= ? or returnAddTime like?`,
    stateChange: `update stock_return set returnStockState=? where returnStockNo=?`,
    multiStateChange: `update stock_return set returnStockState=? where returnStockNo in (?)`,
    pagination: `select * from stock_return limit ?,10`
  },
  //销售订单表
  sales: {
    // 根据商品销售订单ID查询订单详情、
    // 新增商品销售订单、
    // 根据商品销售订单ID删除订单或批量删除
    add: `insert into sales values (0,?,?,?,?,?,?,?)`,
    queryFetch: `select * from sales where salesNo=?`,
    del: `delete from sales where salesNo=? `,
    multiDel: `delete from sales where salesNo in(?)`
  },
  //销售订单汇总表
  sales_summary: {
    // 查询所有销售订单信息、
    // 查询状态为已完成的销售订单、
    // 新增已完成的订单信息
    // 新增商品销售信息、
    // 根据销售订单ID修改销售订单信息、
    // 根据销售订单ID修改销售订单状态或批量修改、
    // 根据销售订单ID查询订单信息或根据订单创建时间进行模糊查询、
    // 根据时间查询所有订单信息（ 包括今天、 昨天、 上周、 上个月）、
    // 根据时间获取年盈利信息和月盈利信息、
    // 根据用户角色获取职员销售信息
    add: `insert into sales_summary values(0,?,?,?,?,?,?,?,'已完成',?)`,
    queryAll: `select * from sales_summary`,
    queryCompleted: `select * from sales_summary where salesState='已完成'`,
    update: `update sales_summary set salesMoneySum=?,salesProfitSum=? where salesNo=?`,
    stateChange: `update sales_summary set salesState='已删除' where salesNo=?`,
    multiStateChange: `update sales_summary set salesState='已删除' where salesNo in(?)`,
    queryByName: `select * from sales_summary where salesNo= ? or salesAddTime like?`,
    pagination: `select * from sales_summary limit ?,10`,
    today: `select * from sales_summary where to_days(salesAddTime) = to_days(now())`,
    yesterday: `SELECT * FROM sales_summary WHERE TO_DAYS( NOW( ) ) - TO_DAYS( salesAddTime)<=1 and TO_DAYS( NOW( ) ) - TO_DAYS( salesAddTime)>0`,
    lastWeek: `SELECT * FROM sales_summary WHERE YEARWEEK(date_format(salesAddTime,'%Y-%m-%d')) = YEARWEEK(now())-1;`,
    lastMonth: `SELECT * FROM sales_summary WHERE PERIOD_DIFF( date_format( now( ) , '%Y%m' ) , date_format( salesAddTime, '%Y%m' ) ) =1`,
    profitAn: `select  
		month(salesAddTime) month,  
		sum(salesMoneySum) totalSales ,
		sum(salesProfitSum) totalProfit 
		from sales_summary  
		group by year(salesAddTime),  
		month(salesAddTime)  
		`,
    empSalesAn: `select 
		editor,
		sum(salesMoneySum) totalSales,date_format(salesAddTime,'%m') month
		 from sales_summary 
		 group by date_format(salesAddTime,'%m'),editor`
  },
  //单个商品销售表
  goods_sales_summary: {
    // 查询所有商品销售情况、
    // 根据商品ID查询该商品销售情况、
    // 新增商品销售信息、
    // 根据商品ID更新商品销售信息
    add: `insert into goods_sales_summary values(0,?,?,?,?,?,?,?)`,
    update: `update goods_sales_summary set salesCount=?,salesMoney=?,salesProfit=? where goodsNo=?`,
    queryAll: `select * from goods_sales_summary`,
    queryById: `select * from goods_sales_summary where goodsNo=?`
  },
  //销售退货订单表
  sales_return: {
    //查询所有销售退货信息
    //新增销售退货
    //根据销售退货ID查询退货信息或根据退货创建时间进行模糊查询
    //根据销售退货ID修改退货状态
    add: `insert into sales_return values (0,?,?,?,?,?,?,?,?,'待审核')`,
    queryAll: `select * from sales_return`,
    stateChange: `update sales_return set returnState='已完成' where returnGoodsNo=?`,
    queryByName: `select * from sales_return where returnGoodsNo= ? or returnAddTime like?`,
    pagination: `select * from sales_return limit ?,10`
  },
  //库存表
  inventory: {
    // 查询所有库存信息、
    // 根据商品ID查询库存信息或根据商品名称进行模糊查询
    // 新增某一商品的库存信息
    // 根据商品ID修改该商品库存信息
    add: `insert ignore into inventory (goodsNo,goodsName,goodsInv) values ?`,
    queryAll: `select * from inventory`,
    queryById: `select goodsInv from inventory where goodsNo=?`,
    queryByName: `select * from inventory where goodsNo=? or goodsName like ?`,
    update: `update inventory set goodsInv=? where goodsNo=?`,
    pagination: `select * from inventory limit ?,10`,
  }


}
module.exports = sqlMap;
