### 是什么
1. 从电子元件的 Datasheet 中提取曲线上各点坐标的工具
2. 只支持 10 为底的指数坐标系，其他的可以自己修改
3. 长成这个样子
![界面](https://gitee.com/chenqidianzi/pictures/raw/master/get-point/demo.png)


### 为什么做这个
1. 用 LTspice 做电路仿真的时候，偶尔会有些元件的参数模型找不到，需要自己根据 datasheet 去计算。
2. 在生成 B772M 这个三极管的模型时候，曲线图是 10 的指数坐标系的，很难精确的从图中看出曲线上各个点的坐标值。
3. 于是写了这个工具，目前功能比较单一，后边用到其他的再补充。

### 工具地址
1. github: https://liu-shichao.github.io/get_point/

### 源码地址
1. github: https://github.com/liu-shichao/get_point
2. gitee: https://gitee.com/chenqidianzi/pictures/tree/master/get-point


### 使用方法
1. 点击【导入】按钮，加载本地的曲线图
2. 输入曲线图中标注的原点坐标，并用鼠标点击原点所在位置，进行标记
3. 输入横坐标中任意一个点的 x 坐标值，并用鼠标点击该点，进行位置标记
4. 输入纵坐标中任意一个点的 y 坐标值，并用鼠标点击该点，进行标记
5. 依次点击曲线上要获取坐标的各个点，右边会生成这些点的坐标值。

### 源码讲解
1. 都是网上搜的拼凑的代码
2. 原理比较简单，就是用 canvas 显示曲线图
3. 并用鼠标计算出 x y 单位长度所代表的比例
4. 之后就根据鼠标与原点位置差来计算对应点的坐标