<template>
  <div class="pos">
   <el-row style="height: 100%">
     <!--菜单栏-->
     <el-col :span="7" id="order">
       <!--tab标签-->
       <el-tabs>
         <el-tab-pane label="结账">
           <!--结账表格-->
           <el-table :data="buygoods" border >
             <el-table-column align="center" prop="goodname" label="商品名称" width="150px"></el-table-column>
             <el-table-column align="center" prop="count" label="数量"></el-table-column>
             <el-table-column align="center" prop="price" label="价格"></el-table-column>
             <el-table-column header-align="center" label="操作" fixed="right" width="100px">
               <template scope="scope">
                 <el-button type="text" size="small">增加</el-button>
                 <el-button type="text" size="small">删除</el-button>
               </template>
             </el-table-column>
           </el-table>
           <div class="btnColumn">
             <el-button type="warning">挂单</el-button>
             <el-button type="danger">删除</el-button>
             <el-button type="success">结账</el-button>
           </div>
         </el-tab-pane>
         <el-tab-pane label="挂单">挂单</el-tab-pane>
         <el-tab-pane label="外卖">外卖</el-tab-pane>
       </el-tabs>
     </el-col>
     <!--产品栏-->
     <el-col :span="17" id="good">
       <!--常买商品栏-->
       <div class="hotsale">
         <p>常买商品</p>
         <ul>
           <li v-for="good in hotsalegood">
             <span>{{good.goodsName}}</span>
             <span class="hotsaleprice">${{good.price}}</span>
           </li>
         </ul>
       </div>
       <!--商品分类-->
       <div id="goodsort">
         <p>商品分类</p>
         <el-tabs  type="card" >
           <el-tab-pane label="便当" >
             <ul class='cookList'>
               <li v-for="cook in typeGoods">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
           <el-tab-pane label="小吃" >
             <ul class='cookList'>
               <li v-for="cook in typefood">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
           <el-tab-pane label="饮料" >
             <ul class='cookList'>
               <li v-for="cook in typedrink">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
           <el-tab-pane label="水果" >
             <ul class='cookList'>
               <li v-for="cook in typefruit">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
         </el-tabs>

       </div>
     </el-col>
   </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'pos',
    data () {
      return {
        buygoods:[
          {
              goodname:"汉堡",
              count:2,
              price:"$12"
          },
          {
            goodname:"可乐",
            count:3,
            price:"$25"
          },
          {
            goodname:"鸡腿",
            count:1,
            price:"$11"
          },{
            goodname:"番茄酱",
            count:4,
            price:"$19"
          }
        ],
        hotsalegood:[],
        typeGoods:[],
        typefood:[],
        typedrink:[],
        typefruit:[]
      }
    },
    /*钩子函数created：创建的时候执行*/
    created() {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(response=>{
          this.hotsalegood=response.data
        })
        .catch(error=>{
            console.log('获取数据失败')
        });
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response=>{
          console.log(response.data)
          this.typeGoods=response.data[0]
          this.typefood=response.data[1]
          this.typedrink=response.data[2]
          this.typefruit=response.data[3]
        })
        .catch(error=>{
          console.log('获取数据失败')
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos{
    height: 100%;
  }
  #order{
  background-color: #fff;
  text-align: center;
  height: 100%;
}
  .btnColumn{
    margin-top:15px
  }
  #good{
    height: 100%;
  }
  .hotsale{
    height: 30%;
    min-height: 200px;
    overflow: hidden;
  }
  .hotsale p,#goodsort p{
    font-size: 18px;
    font-weight: bolder;
    padding: 0 15px;
  }
  .hotsale ul li{
    float: left;
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .hotsaleprice{
    color: #1D8ce0;
    margin-left: 5px;
  }
  .cookList li{
    width:23%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 5px;
  }
  .cookList li span{
    display: block;
    float:left;
  }
  .foodImg{
    width: 40%;
  }
  .foodName{
    font-size: 18px;
    padding-left: 10px;
    color:brown;
  }
  .foodPrice{
    font-size: 16px;
  }
</style>
