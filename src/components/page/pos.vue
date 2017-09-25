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
             <el-table-column align="center" prop="goodsName" label="商品名称" width="150px"></el-table-column>
             <el-table-column align="center" prop="count" label="数量"></el-table-column>
             <el-table-column align="center" prop="price" label="价格"></el-table-column>
             <el-table-column header-align="center" label="操作" fixed="right" width="100px">
               <template scope="scope">
                 <el-button type="text" size="small" @click="addgood(scope.row)">增加</el-button>
                 <el-button type="text" size="small" @click="delsinglegoods(scope.row)">删除</el-button>
               </template>
             </el-table-column>
           </el-table>
           <div class="total">
             <span>数量：{{totalcount}}</span>
             <span>金额：{{totalprice }}</span>
           </div>
           <div class="btnColumn">
             <el-button type="warning">挂单</el-button>
             <el-button type="danger" @click="delallgoods">删除</el-button>
             <el-button type="success" @click="checkout">结账</el-button>
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
           <li v-for="good in hotsalegood" @click="addgood(good)">
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
               <li v-for="cook in typeGoods" @click="addgood(cook)">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
           <el-tab-pane label="小吃" >
             <ul class='cookList'>
               <li v-for="cook in typefood" @click="addgood(cook)">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
           <el-tab-pane label="饮料" >
             <ul class='cookList'>
               <li v-for="cook in typedrink" @click="addgood(cook)">
                 <span class="foodImg"><img :src="cook.goodsImg" alt="" width="100%"></span>
                 <p class="foodName">{{cook.goodsName}}</p>
                 <p class="foodPrice">${{cook.price}}</p>
               </li>
             </ul>
           </el-tab-pane>
           <el-tab-pane label="水果" >
             <ul class='cookList'>
               <li v-for="cook in typefruit" @click="addgood(cook)">
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
        buygoods:[],
        hotsalegood:[],
        typeGoods:[],
        typefood:[],
        typedrink:[],
        typefruit:[],
        totalcount:0,
        totalprice:0
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
          this.typeGoods=response.data[0]
          this.typefood=response.data[1]
          this.typedrink=response.data[2]
          this.typefruit=response.data[3]
        })
        .catch(error=>{
          console.log('获取数据失败')
        })
    },
    methods:{
        /*汇总金额和数量*/
        getallmonney(){
          this.totalcount=0;
          this.totalprice=0;
          this.buygoods.forEach((element)=>{
            this.totalcount+=element.count;
            this.totalprice=this.totalprice+(element.count*element.price)
          })
        },
      /*增加商品*/
        addgood(goods){
          let ishave=true;
          for(let a=0;a<this.buygoods.length;a++){
            if(goods.goodsId==this.buygoods[a].goodsId){
              this.buygoods[a].count++;
              ishave=false
            }
          }
          if(ishave){
             let addgoodcount=$.extend({},goods,{count:1})
            this.buygoods.push(addgoodcount)
          }
         /*汇总金额和数量*/
          this.getallmonney()
       },
      /*删除单个商品*/
      delsinglegoods(goods){
        this.buygoods=this.buygoods.filter(o => o.goodsId !=goods.goodsId)
        this.getallmonney();
      },
      /*删除所有商品*/
      delallgoods(){
        this.buygoods=[];
        this.totalprice=0;
        this.totalcount=0;
      },
      /*结账*/
      checkout(){
          if(this.totalcount){
              this.buygoods=[];
              this.totalprice=0;
              this.totalcount=0;
              this.$message({
                  message:'结账成功，欢迎再次光顾',
                  type:'success'
              })
          }else{
              this.$message.error('不能空结账，请挑选商品')
          }
      }
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
