import React from 'react'

class DesignPage extends React.Component {
  render() {
    return(
      <div >
        <h1 className='h1'>Welcome to the Design Page! (props to Liang for the help)</h1>
        <div className='color-style blue'>#2DA9E1</div>
        <div className='color-style blue-dark'>#24294D</div>
        <div className='color-style yellow'>#FADB46</div>
        <div className='color-style black'>#30404D</div>
        <div className='color-style silver'>#8492A6</div>
        <div className='color-style gray'>#E1E1E1</div>
        <div className='color-style snow'>#F0F2F4</div>

        <h1 className='h1'>This is a h1</h1>
        <h2 className='h2'>This is a h2</h2>
        <h3 className='h3'>This is a h3</h3>
        <p> This is a paragraph. Lorem dim sum Shaomai Congee Shangai steam buns chicken feet mini egg tarts steamed sponge cake tofu with syrup Jin deui Chicken feet.
Cheong fan pan fried bitter melon beef dumpling mango pudding coconut milk pudding black sesame soft ball deep fried bean curd skin rolls rice noodle roll deep fried crab claw soup dumpling cold chicken claw. Egg custard tarts Popular shumai cha siu bao A creamy mango pudding Chiu-chao fan guo Siu mai Haam sui gau Jiu cai bau.
Popular shumai cha siu bao A creamy mango pudding Chiu-chao fan guo Siu mai Haam sui gau Jiu cai bau Zhaliang Pei guen Lo baak gou. Chee cheong fun with barbecued pork steamed radish cake steamed bun with premium lotus paste cabbage roll paekuat.
Leek dumplings deep fried taro turnover Cha siu sou Cheong fan pan fried bitter melon beef dumpling mango pudding coconut milk pudding black sesame soft ball deep fried bean curd skin rolls.</p>
        <h3 className='h3'>Buttons</h3>
        <button className='button'>Button</button>

        <h3 className='h3'>Form</h3>
        <form className='marginTopBot-sm'>
          <input type='text' className='input' placeholder='Name'/>
          <input type='button' className='button'/>
        </form>

        <form className='marginTopBot-sm'>
          <input type='text' className='input input--sm' placeholder='Name'/>
          <input type='button' className='button'/>
        </form>

        <form className='marginTopBot-sm'>
          <input type='text' className='input input--lg' placeholder='Name'/>
          <input type='button' className='button'/>
      </form>
      </div>
    )
  }
}

export default DesignPage
