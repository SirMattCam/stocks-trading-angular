import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './pages/home/home.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { DetailsComponent } from './pages/details/details.component';
import { FollowStocksComponent } from './components/follow-stocks/follow-stocks.component';
import { TransactionGridComponent } from './components/transaction-grid/transaction-grid.component';
import { AssetsGridComponent } from './components/assets-grid/assets-grid.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockGraphComponent } from './components/stock-graph/stock-graph.component';
import { TokenInterceptor } from './services/TokenInterceptor';
import { FollowStocksPopupComponent } from './components/follow-stocks-popup/follow-stocks-popup.component';
import { BuySellPopupComponent } from './components/buy-sell-popup/buy-sell-popup.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/:symbol', component: DetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule, AgGridModule.withComponents([])],
  declarations: [
    AppComponent,
    HomeComponent,
    AssetsComponent,
    DetailsComponent,
    FollowStocksComponent,
    TransactionGridComponent,
    AssetsGridComponent,
    StockDetailsComponent,
    StockGraphComponent,
    FollowStocksPopupComponent,
    BuySellPopupComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
