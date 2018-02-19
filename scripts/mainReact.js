class LoadingWindow extends React.Component{
    render(){
        return <div class="loading-window">
                    <p class="loading-text">LOADING...</p>
                </div>
    }
}

function IconImage(){
    return <h4 class="hold-main-pic margin-to-zero"><img height="19" src="images/splash_logo.png" alt="SOFA"/></h4>;
}

function Title(){
    return <h4 class="title-text set-margin-for-header">10 STEPS OF A NEW REPRESENTATIVE</h4>;
}

function CityList(){
    return <div class="hold-search margin-to-zero">
                <div class="control-list-div"></div>
            </div>;
}

function Languages(){
    return <div class = "languages">
                    <p><a class="changeLang pointable" id="en">EN</a></p>
                    <p><a class="changeLang pointable" id="ru">RU</a></p>
                    <p><a class="changeLang pointable" id="he">HE</a></p>
                    <p><a class="changeLang pointable" id="fr">FR</a></p>     
                </div>;
}

function TextSize(){
    return <div class="textSize">
                <p id="plus-text" class="resizeText pointable">+</p>
                <p>A</p>
                <p id="minus-text" class="resizeText pointable">-</p>
            </div>;
}

function SofaHorizScrollMenuBody(){
    return <section class="sofa-horiz">
            <a href="#" id="item1" class=" menu-item">
                <img class="step-image" src="images/step_01.png"/>
                <p class="choose-step">Teudat Zehut</p>
            </a>
            <a href="#" id="item2" class=" menu-item">
                    <img class="step-image" src="images/step_02.png"/>
                    <p class="choose-step">Opening a bank account</p>
                </a>
            <a href="#" id="item3" class=" menu-item">
                    <img class="step-image" src="images/step_03.png"/>
                    <p class="choose-step">Registration in a Health Fund</p>
            </a>
            <a href="#" id="item4" class=" menu-item">
                    <img class="step-image" src="images/step_04.png"/>
                    <p class="choose-step">Аbsorption basket and  Hebrew ulpan</p>
            </a>
            <a href="#" id="item5" class=" menu-item">
                    <img class="step-image" src="images/step_05.png"/>
                    <p class="choose-step">Kindergarten / school</p>
            </a>
            <a href="#" id="item6" class=" menu-item">
                    <img class="step-image" src="images/step_06.png"/>
                    <p class="choose-step">Housing</p>
            </a>
            <a href="#" id="item7" class=" menu-item">
                    <img class="step-image" src="images/step_07.png"/>
                    <p class="choose-step">Apply for the arnona discount</p>
            </a>
            <a href="#" id="item8" class=" menu-item">
                    <img class="step-image" src="images/step_08.png"/>
                    <p class="choose-step">Confirm the education</p>
            </a>
            <a href="#" id="item9" class=" menu-item">
                    <img class="step-image" src="images/step_09.png"/>
                    <p class="choose-step">Converting a Driver's License</p>
            </a>
            <a id="item-filler"></a>
        </section>
}

function HorizScrollButtonHolder(){
    return <section class="scrollbutton-holder">
                <a class="scroll-back"><h1>{"<"}</h1></a>
                <a class="scroll-forward"><h1>{">"}</h1></a>
            </section>
}

function SofaStepHeader(){
    return <div class="step-header">
                <img class="step-img"/>
                <p class="step-head"></p>
                <p class="info-head pointable">INFO</p>
            </div>
}

function InfoOfStep(){
    return <div class="info-of-step">
                <div class="description-text"></div>
                <div class="step-need"></div>
            </div>
}

function HelpDescription(){
    return <div class="description-help">
    
            </div>
}

function InfoAboutMarker(){
    return <div class="info-of-marker"></div>
}

function DescriptionOfStep(){
    return <div class="step-description">
                <InfoOfStep/>
                <HelpDescription/>
                <InfoAboutMarker/>
            </div>

}

class SofaStep extends React.Component{
    render(){
        return <section class="sofa-step">
                    <SofaStepHeader/>
                    <DescriptionOfStep/>
                </section>
    }
}

class SofaMap extends React.Component{
    render(){
        return <section class="sofa-map" id="map">
                </section>
    }
}

class SofaHoldInfo extends React.Component{
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
    render(){
        return <section class="scroll-horiz main-section">
                    <SofaHorizScrollMenuBody/>
                    <HorizScrollButtonHolder/>
                </section>
    }
}

class SideMenu extends React.Component{
    render(){
        return <section class="real-side-menu">
                    <Languages/>
                    <TextSize/>
                </section>
    }
}

class CasualMenu extends React.Component{
    render(){
        return <div class="cas-menu">
                    <IconImage/>
                    <Title/>
                    <CityList/>
                </div>
    }
}

class SofaHeader extends React.Component{
    render(){
        return <header class="sofa-header">
                    <CasualMenu/>
                    <SideMenu/>
                </header>
    }
}



  