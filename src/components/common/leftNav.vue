<template>
  <div class="leftNave">
    <ul>
      <li>
        <i class="icon iconfont icon-wodezichan"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="icon iconfont icon-mine2"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="icon iconfont icon-31quanbushangpin"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="icon iconfont icon-liwuhuodong"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="icon iconfont icon-shezhi"></i>
        <div>设置</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
      name:"leftNav"
  }
</script>

<style >
  .leftNave{
      width: 5%;
      height: 100%;
      background-color: #1D8ce0;
      float: left;
  }
  .leftNave ul{
    padding-top: 15px;
  }
  .leftNave ul li{
   text-align: center;
    list-style: none;
    color: #fff;
    padding: 8px 0;
    cursor: pointer;
  }
  .leftNave .iconfont{
    font-size: 20px;
  }
</style>
