function Tanakatable(ryubi,butai){
		Rat=new Array();
		Rat[0]=[2.830,2.830,2.830,2.830,2.830,2.830];
		Rat[1]=[1.450,1.698,1.812,1.812,1.812,1.812];
		Rat[2]=[1.074,1.208,1.298,1.329,1.390,1.390];
		Rat[3]=[1.000,1.000,1.020,1.074,1.112,1.112];
		Rat[4]=[1.000,1.000,1.000,1.000,1.000,1.000];
	return Rat[ryubi-1][butai-1];
}
function akitifac(akiti){
		Fac1=new Array();
		Fac1[0]=[45000,4500,15,150,1];
		Fac1[1]=[372900,38100,127,1243,3];
		Fac1[2]=[378600,37200,124,1262,3];
		Fac1[3]=[414600,40200,134,1382,3];
	return Fac1[akiti];
}
function optcal(Lv,At,Sp,C,Atskill,Spskill,Sskill,H,Dlimit,ryubi,butai,Aup,Sk,akiti,KLv,ELv,clc2,adh){
	if(Aup==true){Aupp=1.1;}else{Aupp=1.0;}
	if(Sk==true){Skk=1;}else{Skk=2;}
	Fac1=akitifac(akiti)
	At1=At*(1+0.01*Atskill)/eval(Tanakatable(ryubi,butai))*Aupp;
	Sp1=Sp*(1+0.01*Spskill+0.05*KLv);
	KLv1=0.05*KLv;
	ELv1=0.001*ELv;
	aa1=0;
	bb1=0;
	cc1=0;
	if(clc2==true){
		ELv=0;//遠征訓練所は考慮しない
//		adh=6;
		aa1=15000*Fac1[2]*(6*adh*Fac1[2]*Sp1-47*At1*Skk);
		bb1=-600*adh*Fac1[2]*(141*At1*Lv-300*Fac1[3]+2650*At1)*Sp1;
		cc1=adh*Math.pow(141*At1*Lv-300*Fac1[3]+2650*At1,2)*Sp1;
		D=Math.min(Dlimit,(-bb1-Math.sqrt(Math.pow(bb1,2)-4*aa1*cc1))/(2*aa1));
//		alert(D);
	}else{
		if(ELv==0){
			D=Math.min(Dlimit,(141*At1*Lv+2650*At1-Fac1[0])/(Fac1[1]*Sp1+2350*At1/H)*Sp1);
		}else{
			aa1=(Fac1[1]*Sp*ELv1*H);
			bb1=((1+0.01*Spskill+KLv1)*H*Fac1[1]*Sp+2350*At1-ELv1*Sp*H*(141*At1*Lv+2650*At1-Fac1[0]));
			cc1=-((141*At1*Lv+2650*At1-Fac1[0])*(1+0.01*Spskill+KLv1)*Sp*H);
			D=Math.min(Dlimit,(-bb1+Math.sqrt(Math.pow(bb1,2)-4*aa1*cc1))/(2*aa1));
		}
	}
//	alert(D);
	Atd=(Fac1[2]*D+Fac1[3])*eval(Tanakatable(ryubi,butai));
	AtPt=Math.ceil(eval((Atd/(At*(1+Atskill*0.01)*Aupp)-1)/0.094));
	SpPt=Lv*5-AtPt;
	S=D*Fac1[4]*15*(1+Sskill*0.01);
	Spf=(SpPt*0.012+1)*Sp;
//	hf=D/(Spf*(1+0.01*Spskill));
	hf=D/(Spf*(1+0.01*Spskill+0.05*KLv+D*ELv1));
	Atf=(AtPt*0.094+1)*At;
	if(Sk==true){Sch=S/C/hf;}else{Sch=S/C/hf/2;}
	return [D,AtPt,SpPt,hf,Atf,Spf,S,Sch];
}
function skilllist(skill1,nskill1){
	skilldata001=new Array();
	//------;ID:000
	skilldata001[0]=[
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	],
		[0		,0		,0		,1.5	]];
	//猛将の鹵獲;ID:001
	skilldata001[1]=[
		[7		,10		,10		,15.556	],
		[9		,12		,14		,9.833	],
		[11		,14		,18		,9.667	],
		[13		,16		,22		,9.500	],
		[16		,19		,27		,9.167	],
		[19		,22		,32		,8.833	],
		[22		,26		,37		,8.333	],
		[25		,30		,42		,7.833	],
		[29		,35		,48		,7.167	],
		[33		,40		,54		,6.167	]];
	//趁火打劫;ID:002
	skilldata001[2]=[
		[9		,0		,6		,10.000	],
		[10		,0		,8		,9.833	],
		[11		,0		,10		,9.667	],
		[12		,0		,12		,9.500	],
		[13		,0		,14		,9.167	],
		[14		,0		,17		,8.833	],
		[15		,0		,20		,8.333	],
		[16		,0		,23		,7.833	],
		[17.5	,0		,27		,7.167	],
		[19		,0		,31		,6.167	]];
	//飛将;ID:003
	skilldata001[3]=[
		[30		,0		,0		,10.000	],
		[40		,0		,0		,9.833	],
		[50		,0		,0		,9.667	],
		[60		,0		,0		,9.500	],
		[70		,0		,0		,9.167	],
		[80		,0		,0		,8.833	],
		[100	,0		,0		,8.333	],
		[125	,0		,0		,7.833	],
		[175	,0		,0		,7.167	],
		[225	,0		,0		,6.167	]];
	//迅速劫略;ID:004
	skilldata001[4]=[
		[12		,24		,7		,10.000	],
		[16		,28		,9		,9.833	],
		[20		,32		,11		,9.667	],
		[24		,36		,13		,9.500	],
		[28		,41		,15		,9.167	],
		[33		,46		,18		,8.833	],
		[38		,51		,21		,8.333	],
		[44		,57		,24		,7.833	],
		[52		,63		,28		,7.167	],
		[62		,70		,32		,6.167	]];
	//○兵突撃;ID:005
	skilldata001[5]=[
		[6		,7		,0		,10.000	],
		[8		,9		,0		,9.833	],
		[10		,11		,0		,9.667	],
		[13		,14		,0		,9.500	],
		[16		,17		,0		,9.167	],
		[19		,20		,0		,8.833	],
		[23		,24		,0		,8.333	],
		[26		,27		,0		,7.833	],
		[30		,31		,0		,7.167	],
		[33		,35		,0		,6.167	]];
	//○兵突覇;ID:006
	skilldata001[6]=[
		[8		,10		,0		,10.000	],
		[11		,13		,0		,9.833	],
		[14		,16		,0		,9.667	],
		[18		,20		,0		,9.500	],
		[22		,24		,0		,9.167	],
		[26		,28		,0		,8.833	],
		[30		,32		,0		,8.333	],
		[34		,36		,0		,7.833	],
		[40		,42		,0		,7.167	],
		[46		,48		,0		,6.167	]];
	//千里行;ID:007
	skilldata001[7]=[
		[0		,16		,0		,10.000	],
		[0		,21		,0		,9.833	],
		[0		,26		,0		,9.667	],
		[0		,31		,0		,9.500	],
		[0		,36		,0		,9.167	],
		[0		,42		,0		,8.833	],
		[0		,48		,0		,8.333	],
		[0		,54		,0		,7.833	],
		[0		,62		,0		,7.167	],
		[0		,70		,0		,6.167	]];
	//;劉備の大徳 ID:008
	skilldata001[8]=[
		[0		,0		,0		,15.556	],
		[0		,0		,0		,9.833	],
		[22		,39		,62.5	,9.667	],
		[24		,41		,70		,9.500	],
		[27		,44		,77.5	,9.167	],
		[30		,47		,90		,8.833	],
		[22		,26		,37		,8.333	],
		[25		,30		,42		,7.833	],
		[29		,35		,48		,7.167	],
		[33		,40		,54		,6.167	]];
	//;○兵の進攻 ID:101
	skilldata001[101]=[
		[4		,0		,0		,1.5	],
		[5		,0		,0		,1.5	],
		[6		,0		,0		,1.5	],
		[7		,0		,0		,1.5	],
		[8		,0		,0		,1.5	],
		[9		,0		,0		,1.5	],
		[10		,0		,0		,1.5	],
		[11		,0		,0		,1.5	],
		[12.5	,0		,0		,1.5	],
		[14		,0		,0		,1.5	]];
	//;○兵の強攻 ID:102
	skilldata001[102]=[
		[6		,0		,0		,1.5	],
		[7.5	,0		,0		,1.5	],
		[9		,0		,0		,1.5	],
		[10.5	,0		,0		,1.5	],
		[12		,0		,0		,1.5	],
		[13.5	,0		,0		,1.5	],
		[15		,0		,0		,1.5	],
		[16.5	,0		,0		,1.5	],
		[18.5	,0		,0		,1.5	],
		[20.5	,0		,0		,1.5	]];
	//;○兵の猛攻 ID:103
	skilldata001[103]=[
		[10		,0		,0		,1.5	],
		[12.5	,0		,0		,1.5	],
		[15		,0		,0		,1.5	],
		[17.5	,0		,0		,1.5	],
		[20		,0		,0		,1.5	],
		[22.5	,0		,0		,1.5	],
		[25		,0		,0		,1.5	],
		[27.5	,0		,0		,1.5	],
		[30.5	,0		,0		,1.5	],
		[33.5	,0		,0		,1.5	]];
	//;○兵の極攻 ID:104
	skilldata001[104]=[
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[20		,0		,0		,1.5	],
		[23		,0		,0		,1.5	],
		[26		,0		,0		,1.5	],
		[29		,0		,0		,1.5	],
		[32		,0		,0		,1.5	],
		[35		,0		,0		,1.5	],
		[38.5	,0		,0		,1.5	],
		[42		,0		,0		,1.5	]];
	//;闘将の極意 ID:105
	skilldata001[105]=[
		[13		,0		,0		,1.5	],
		[14		,0		,0		,1.5	],
		[15		,0		,0		,1.5	],
		[16		,0		,0		,1.5	],
		[18		,0		,0		,1.5	],
		[20		,0		,0		,1.5	],
		[23		,0		,0		,1.5	],
		[27		,0		,0		,1.5	],
		[32		,0		,0		,1.5	],
		[38		,0		,0		,1.5	]];
	//;猛将の極意 ID:106
	skilldata001[106]=[
		[18		,0		,0		,1.5	],
		[20		,0		,0		,1.5	],
		[22		,0		,0		,1.5	],
		[24		,0		,0		,1.5	],
		[28		,0		,0		,1.5	],
		[32		,0		,0		,1.5	],
		[38		,0		,0		,1.5	],
		[46		,0		,0		,1.5	],
		[58		,0		,0		,1.5	],
		[70		,0		,0		,1.5	]];
	//;鬼神の極意 ID:107
	skilldata001[107]=[
		[-1000	,0		,0		,1.5	],
		[27		,0		,0		,1.5	],
		[30		,0		,0		,1.5	],
		[33		,0		,0		,1.5	],
		[39		,0		,0		,1.5	],
		[45		,0		,0		,1.5	],
		[53		,0		,0		,1.5	],
		[67		,0		,0		,1.5	],
		[86		,0		,0		,1.5	],
		[105	,0		,0		,1.5	]];
	//;神速行勢 ID:108
	skilldata001[108]=[
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[0			,19		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	],
		[-1000	,0		,0		,1.5	]];
	return skilldata001[skill1][nskill1-1];
}
function Calc1(){
		Lv=(eval(document.table1.Lv.value))?eval(document.table1.Lv.value):0;
		At=(eval(document.table1.At.value))?eval(document.table1.At.value):0;
		Sp=(eval(document.table1.Sp.value))?eval(document.table1.Sp.value):0;
		C=(eval(document.table1.C.value))?eval(document.table1.C.value):0;
		Atskill=(eval(document.table1.Atskill.value))?eval(document.table1.Atskill.value):0;
		Spskill=(eval(document.table1.Spskill.value))?eval(document.table1.Spskill.value):0;
		Sskill=(eval(document.table1.Sskill.value))?eval(document.table1.Sskill.value):0;
		clc2=document.table1.clc2.checked;
		H=(eval(document.table1.H.value))?eval(document.table1.H.value):0;
		Dlimit=(eval(document.table1.Dlimit.value))?eval(document.table1.Dlimit.value):0;
		adh=(eval(document.table1.skltime.value))?eval(document.table1.skltime.value):0;
		ryubi=(eval(document.table1.ryubi.value))?eval(document.table1.ryubi.value):0;
		butai=(eval(document.table1.butai.value))?eval(document.table1.butai.value):0;
		akiti=(eval(document.table1.akiti.value))?eval(document.table1.akiti.value):0;
		KLv=(eval(document.table1.KLv.value))?eval(document.table1.KLv.value):0;
		ELv=(eval(document.table1.ELv.value))?eval(document.table1.ELv.value):0;
		Aup=document.table1.Aup.checked;
		Sk=document.table1.Sk.checked;
		ans=eval(optcal(Lv,At,Sp,C,Atskill,Spskill,Sskill,H,Dlimit,ryubi,butai,Aup,Sk,akiti,KLv,ELv,clc2,adh));
	document.table1.D.value=ans[0].toFixed(1);
	document.table1.AtPt.value=ans[1];
	document.table1.SpPt.value=ans[2];
	document.table1.hf.value=ans[3].toFixed(2);
	document.table1.Atf.value=ans[4].toFixed(0);
	document.table1.Spf.value=ans[5].toFixed(1);
	document.table1.S.value=ans[6].toFixed(0);
	document.table1.Sch.value=ans[7].toFixed(0);
}
function Calc2(){
		skill=new Array (0,0,0);
		nskill=new Array (0,0,0);
		fac=new Array (0,0,0);
		alfac=new Array (0,0,0);
		C=(eval(document.table1.C.value))?eval(document.table1.C.value):0;
		skill[0]=(eval(document.table1.skill01.value))?eval(document.table1.skill01.value):0;
		nskill[0]=(eval(document.table1.nskill01.value))?eval(document.table1.nskill01.value):0;
		skill[1]=(eval(document.table1.skill02.value))?eval(document.table1.skill02.value):0;
		nskill[1]=(eval(document.table1.nskill02.value))?eval(document.table1.nskill02.value):0;
		skill[2]=(eval(document.table1.skill03.value))?eval(document.table1.skill03.value):0;
		nskill[2]=(eval(document.table1.nskill03.value))?eval(document.table1.nskill03.value):0;
		for (i = 0; i < 3; i = i +1){
			fac=skilllist(skill[i],nskill[i]);
			alfac[0] = alfac[0]+fac[0];
			alfac[1] = alfac[1]+fac[1];
			alfac[2] = alfac[2]+fac[2];
			if(i==0){skltime=fac[3];}
		}
		document.table1.Atskill.value=alfac[0]*C;
		document.table1.Spskill.value=alfac[1]*C;
		document.table1.Sskill.value=alfac[2]*C;
		document.table1.skltime.value=skltime;
		Calc1();
}
function Calc3(){
		clc2=document.table1.clc2.checked;
		if(clc2==true){
		document.table1.H.disabled = true;
		document.table1.ELv.value = 0;
		document.table1.ELv.disabled = true;
		}else{
		document.table1.H.disabled = false;
		document.table1.ELv.disabled = false;
		}
		Calc2();
}

