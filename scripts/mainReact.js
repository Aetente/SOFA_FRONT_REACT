class LoadingWindow extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <div class="loading-window">
                    <p class="loading-text">LOADING...</p>
                </div>
    }
}

class IconImage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <h4 class="hold-main-pic margin-to-zero"><img height="19" src="images/splash_logo.png" alt="SOFA"/></h4>;
    }
}

class Title extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            title: "10 STEPS OF A NEW REPRESENTATIVE"
        }
        //TODO update title
    }

    updateTitle = (newTitle) => {this.setState({title: newTitle})}

    render(){
        return <h4 class="title-text set-margin-for-header">{this.state.title}</h4>;
    }
}

class CityList extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            cityList: [],
            cityValueList: []
        }
    }

    //TODO build list according to names
    //TODO set clicks

    eachCity = (city,i) => {return <option value = {this.state.cityValueList[i]}>{city}</option>};

    upadateCityList = (newCityList, newCityValues) =>{this.setState({
                                                            cityList: newCityList,
                                                            cityValueList: newCityValues
                                                        }
                                                    )};
    
    

    render(){
        return <div class="hold-search margin-to-zero">
                    <div class="control-list-div">
                        {this.state.cityList.map(this.eachCity)}
                    </div>
                </div>;
    }
}

class Languages extends React.Component{
    
    constructor(props){
        super(props);
    }

    //TODO set clicks

    render(){
        return <div class = "languages">
                        <p><a class="changeLang pointable" id="en">EN</a></p>
                        <p><a class="changeLang pointable" id="ru">RU</a></p>
                        <p><a class="changeLang pointable" id="he">HE</a></p>
                        <p><a class="changeLang pointable" id="fr">FR</a></p>     
                    </div>;
    }
}

class TextSize extends React.Component{
    
    constructor(props){
        super(props);
    }

    //TODO set clicks

    render(){
        return <div class="textSize">
                    <p id="plus-text" class="resizeText pointable">+</p>
                    <p>A</p>
                    <p id="minus-text" class="resizeText pointable">-</p>
                </div>;
    }
}

class SofaHorizScrollMenuBody extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            stepNames: [
                "Teudat Zehut",
                "Opening a bank account",
                "Registration in a Health Fund",
                "Аbsorption basket and  Hebrew ulpan",
                "Kindergarten / school",
                "Housing",
                "Apply for the arnona discount",
                "Confirm the education",
                "Converting a Driver's License"
            ]
        }
    }

    //TODO update step names
    //TODO set clicks

    updateStepNames = (newStepNames) =>{this.setState({stepNames: newStepNames})};

    render(){
        return <section class="sofa-horiz">
                <a href="#" id="item1" class=" menu-item">
                    <img class="step-image" src="images/step_01.png"/>
                    <p class="choose-step">{this.state.stepNames[0]}</p>
                </a>
                <a href="#" id="item2" class=" menu-item">
                        <img class="step-image" src="images/step_02.png"/>
                        <p class="choose-step">{this.state.stepNames[1]}</p>
                    </a>
                <a href="#" id="item3" class=" menu-item">
                        <img class="step-image" src="images/step_03.png"/>
                        <p class="choose-step">{this.state.stepNames[2]}</p>
                </a>
                <a href="#" id="item4" class=" menu-item">
                        <img class="step-image" src="images/step_04.png"/>
                        <p class="choose-step">{this.state.stepNames[3]}</p>
                </a>
                <a href="#" id="item5" class=" menu-item">
                        <img class="step-image" src="images/step_05.png"/>
                        <p class="choose-step">{this.state.stepNames[4]}</p>
                </a>
                <a href="#" id="item6" class=" menu-item">
                        <img class="step-image" src="images/step_06.png"/>
                        <p class="choose-step">{this.state.stepNames[5]}</p>
                </a>
                <a href="#" id="item7" class=" menu-item">
                        <img class="step-image" src="images/step_07.png"/>
                        <p class="choose-step">{this.state.stepNames[6]}</p>
                </a>
                <a href="#" id="item8" class=" menu-item">
                        <img class="step-image" src="images/step_08.png"/>
                        <p class="choose-step">{this.state.stepNames[7]}</p>
                </a>
                <a href="#" id="item9" class=" menu-item">
                        <img class="step-image" src="images/step_09.png"/>
                        <p class="choose-step">{this.state.stepNames[8]}</p>
                </a>
                <a id="item-filler"></a>
            </section>
    }
}

class HorizScrollButtonHolder extends React.Component{
    
    constructor(props){
        super(props);
    }

    //TODO set clicks

    render(){
        return <section class="scrollbutton-holder">
                    <a class="scroll-back"><h1>{"<"}</h1></a>
                    <a class="scroll-forward"><h1>{">"}</h1></a>
                </section>
    }
}

class SofaStepHeader extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            stepHeadName: "Teudat Zehut"
        }
    }

    //TODO update step head name
    //TODO set clicks

    updateStepHeadName = (newStepHeadName) =>{this.setState({stepHeadName: newStepHeadName})};

    render(){
        return <div class="step-header">
                    <img class="step-img"/>
                    <p class="step-head">{this.state.stepHeadName.toUpperCase()}</p>
                    <p class="info-head pointable">INFO</p>
                </div>
    }
}

class InfoOfStep extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            descriptionText: "",
            stepNeedText: ""
        }
    }

    //TODO update state values

    updateDescriptionText = (newDescriptionText) =>{this.setState({descriptionText: newDescriptionText})};
    updateStepNeedText = (newStepNeedText) => {this.setState({stepNeedText: newStepNeedText})};

    render(){
        return <div class="info-of-step">
                    <div class="description-text">{this.state.descriptionText}</div>
                    <div class="step-need">{this.state.stepNeedText}</div>
                </div>
    }
}

class HelpDescription extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <div class="description-help">
        
                </div>
    }
}

class InfoAboutMarker extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <div class="info-of-marker"></div>
    }
}

class DescriptionOfStep extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <div class="step-description">
                    <InfoOfStep/>
                    <HelpDescription/>
                    <InfoAboutMarker/>
                </div>
    }
}

class SofaStep extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <section class="sofa-step">
                    <SofaStepHeader/>
                    <DescriptionOfStep/>
                </section>
    }
}

class SofaMap extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <section class="sofa-map" id="map">
                </section>
    }
}

class SofaHoldInfo extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <section class="hold-info main-section">
                    <div class="the-info">
                        <SofaStep/>
                        <SofaMap/>
                    </div>
                </section>
    }
}

class SofaContent extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <div class="sofa-row main-section">
                    <div class="sofa-content">
                        <div class="empty_column"></div>
                        <SofaHorizScrollMenu/>
                        <SofaHoldInfo/>
                    </div>
                </div>
    }
}

class SofaHorizScrollMenu extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <section class="scroll-horiz main-section">
                    <SofaHorizScrollMenuBody/>
                    <HorizScrollButtonHolder/>
                </section>
    }
}

class SideMenu extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <section class="real-side-menu">
                    <Languages/>
                    <TextSize/>
                </section>
    }
}

class CasualMenu extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <div class="cas-menu">
                    <IconImage/>
                    <Title/>
                    <CityList/>
                </div>
    }
}

class SofaHeader extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return <header class="sofa-header">
                    <CasualMenu/>
                    <SideMenu/>
                </header>
    }
}



  