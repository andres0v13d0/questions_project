import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Poppins',
  fonts: [
    {src: '/styles/Poppins/Poppins-Bold.ttf', fontWeight: 'bold'},
    {src: '/styles/Poppins/Poppins-Light.ttf'}
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  titulo: {
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  subtitulo: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  subtitulo2: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  indicaciones: {
    fontSize: 11,
    fontFamily: 'Poppins',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    marginBottom: 10
  },
  datos: {
    fontSize: 11,
    fontFamily: 'Poppins',
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    fontFamily: 'Poppins',
    fontSize: 11,
    border: '1px solid black'
  },
  cellNum: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderRight: '1px solid black',
    width: 20
  },
  cellItem: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderRight: '1px solid black',
    width: 75,
  },
  cellDes: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderRight: '1px solid black',
    width: 250,
  },
  cellPeso: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderRight: '1px solid black',
    width: 33,
  },
  cellPunt: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderRight: '1px solid black',
    width: 55,
  },
  cellObser: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: 120,
  },
  rowData: {
    flexDirection: 'row',
    fontFamily: 'Poppins',
    fontSize: 11,
    border: '1px solid black',
    borderTop: 'none'
  },
  cellNumD: {
    textAlign: 'center',
    borderRight: '1px solid black',
    width: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  cellItemD: {
    borderRight: '1px solid black',
    width: 75,
    display: 'flex',
    justifyContent: 'center', 
  },
  cellDesD: {
    borderRight: '1px solid black',
    width: 250,
    display: 'flex',
    flexDirection: 'column'
  },
  cellPesoD: {
    textAlign: 'center',
    borderRight: '1px solid black',
    width: 33,
    display: 'flex',
    flexDirection: 'column'
  },
  cellPuntD: {
    textAlign: 'center',
    borderRight: '1px solid black',
    width: 55,
    display: 'flex',
    flexDirection: 'column'
  },
  cellObserD: {
    width: 120,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 9,
  },
});

const PDFDocument = ({ content, option }) => (
  <Document title='Reporte'>
    <Page size="A4" style={styles.page} >
      <Image
        src="/assets/logo.png" 
        style={{
          width: 80,
          height: 'auto',
          objectFit: 'cover',
          position: 'absolute',
          left: 20
        }}
      />
      
      <View>
        <Text style={styles.titulo}>ESCUELA SUPERIOR POLITÉCNICA DE CHIMBORAZO</Text>
      </View>
      <View>
        <Text style={styles.subtitulo}>DECANATO DE VINCULACIÓN</Text>
      </View>
      <View>
        <Text style={styles.subtitulo2}>EVALUACIÓN DE PROYECTOS DE VINCULACIÓN PREVIA SU APROBACIÓN</Text>
      </View>
      <View>
        <Text style={styles.indicaciones}><Text style={{fontWeight: 'bold',}}>INDICACIONES:</Text> Los proyectos para su aprobación y ejecución deberán completar un mínimo de 80 puntos.</Text>
      </View>
      <View>
        <Text style={styles.datos}><Text style={{fontWeight: 'bold',}}>Título del proyecto:</Text> {content.projectName}</Text>
      </View>
      <View>
        <Text style={styles.datos}><Text style={{fontWeight: 'bold',}}>Nombre del coordinador:</Text> {content.coordinator}</Text>
      </View>
      <View>
        <View style={styles.datos}><Text style={{fontWeight: 'bold',}}>Integrantes:</Text></View>
        <View>
          <View style={styles.datos}><Text>{content.members.join(', ')}</Text></View>
        </View>
      </View>
      <View style={{height: 10}}></View>
      <View style={styles.row}>
        <Text style={styles.cellNum}>#</Text>
        <Text style={styles.cellItem}>ITEM</Text>
        <Text style={styles.cellDes}>DESCRIPCIÓN</Text>
        <Text style={styles.cellPeso}>PESO</Text>
        <Text style={styles.cellPunt}>PUNTAJE</Text>
        <Text style={styles.cellObser}>OBSERVACIÓN</Text>
      </View>
      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>1</Text></View>
        <View style={styles.cellItemD}><Text>Objetivos</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>El objetivo general es alcanzable y está de acuerdo con el título del proyecto.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Los objetivos específicos (componentes) son alcanzables y permitirán el cumplimiento del objetivo del proyecto.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{height: 33, display: 'flex', justifyContent: 'center'}}><Text>3</Text></View>
          </View>
          <View>
            <View style={{height: 50, borderTop: '1px solid black', display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
          <View>
          <View style={{height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 1)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{height: 50, borderTop: '1px solid black', display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 2)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
          <View>
          <View style={{height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 1)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{height: 50, borderTop: '1px solid black', display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 2)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>


      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>2</Text></View>
        <View style={styles.cellItemD}><Text>Problema</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>Se cuenta con un diagnóstico de la zona de intervención.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Se detecta y describe claramente las problemáticas de la zona/s a intervenir y qué problemática ha sido priorizada para atender con el proyecto.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{height: 33, display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
          <View>
            <View style={{height: 50, borderTop: '1px solid black', display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
          <View>
          <View style={{height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 3)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{height: 50, borderTop: '1px solid black', display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 4)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
          <View>
          <View style={{height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 3)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{height: 50, borderTop: '1px solid black', display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 4)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>3</Text></View>
        <View style={styles.cellItemD}><Text>Impacto del proyecto</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>Se describe el impacto social esperado con la ejecución del proyecto.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Se describe el impacto económico esperado en la ejecución del proyecto.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Se describe el impacto científico esperado en la ejecución del proyecto.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Se describe el impacto ambiental esperado en la ejecución del proyecto.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>4</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>4</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>4</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 33, display: 'flex', justifyContent: 'center'}}><Text>4</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 5)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 6)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 7)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 8)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 5)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 6)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 7)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 8)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>4</Text></View>
        <View style={styles.cellItemD}><Text>Metodología</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>La metodología descrita tiene base científica.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>La metodología es adecuada para atacar la problemática que va a atacar con el proyecto.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>La metodología es innovadora.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 18, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 9)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 10)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 18, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 11)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 9)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 10)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 17, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 11)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>5</Text></View>
        <View style={styles.cellItemD}><Text>Planificación</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>Los resultados a alcanzar con cada objetivo son claros.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Las actividades descritas permitirán cumplir con los objetivos y sus resultados.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Las evidencias descritas son objetivas, verificables y acorde a la actividad.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 33, display: 'flex', justifyContent: 'center'}}><Text>4</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 12)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 13)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 14)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 12)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 13)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 14)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={{height: 100, borderBottom: '1px solid black'}}></View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>6</Text></View>
        <View style={styles.cellItemD}><Text>Presupuesto</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>La asignación de recursos institucionales (interno) es adecuado y acorde a las actividades planificadas.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Existe aporte externo para apoyar la ejecución de las actividades.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 49.5, display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 49.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 15)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 1)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 49.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 15)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 16)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>7</Text></View>
        <View style={styles.cellItemD}><Text>Replicabilidad</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>Los resultados del proyecto se pueden replicar en otros sectores de la sociedad.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 17)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 17)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>


      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>8</Text></View>
        <View style={styles.cellItemD}><Text>Equipo de trabajo</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>Se ajusta y está acorde a las actividades planteadas y a la normativa vigente.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Los docentes corresponden a las áreas de conocimiento acordes al proyecto.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>3</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 18)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 19  )?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 18)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 34, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 19)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>9</Text></View>
        <View style={styles.cellItemD}><Text>Formato</Text></View>
        <View style={styles.cellDesD}>
          <View>
            <Text>El formato ha sido completado en todos sus campos de forma adecuada.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>El proyecto está anclado a un programa y a las líneas de investigación y vinculación institucionales vigentes.</Text>
          </View>
          <View>
            <Text style={{borderTop: '1px solid black'}}>Los documentos están revisados y aprobados por la Comisión de Investigación, Vinculación y Transferencia de Ciencia y Tecnología.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>5</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 50.5, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 49, display: 'flex', justifyContent: 'center'}}><Text>2</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 20)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 50.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 21)?.response || "0"}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 49, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 22)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
        <View>
            <View style={{ height: 33, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 20)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 50.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 21)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 49, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 22)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={styles.cellNumD}><Text>10</Text></View>
        <View style={styles.cellItemD}><Text>Tipo de proyecto</Text></View>
        <View style={styles.cellDesD}>
          {option === 'option1' ? (
            <View>
              <Text>Es un proyecto multidisciplinario.</Text>
            </View>
          ) : (
            <View>
              <Text>Es un proyecto de carrera.</Text>
            </View>
          )}
          <View>
            <Text style={{borderTop: '1px solid black'}}>Cuenta con el pedido de la entidad externa.</Text>
          </View>
        </View>
        <View style={styles.cellPesoD}>
          <View>
            <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>
                {option === 'option1' ? "10" : "5"}
              </Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 18, display: 'flex', justifyContent: 'center'}}><Text>10</Text></View>
          </View>
        </View>
        <View style={styles.cellPuntD}>
          {option === 'option1' ? (
            <View>
              <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 23)?.response || "0"}</Text></View>
            </View>
          ) : (
            <View>
              <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 24)?.response || "0"}</Text></View>
            </View>
          )}
          <View>
            <View style={{borderTop: '1px solid black', height: 18, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 25)?.response || "0"}</Text></View>
          </View>
        </View>
        <View style={styles.cellObserD}>
          <View>
            <View style={{ height: 16.5, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 23)?.observation || " "}</Text></View>
          </View>
          <View>
            <View style={{borderTop: '1px solid black', height: 18, display: 'flex', justifyContent: 'center'}}><Text>{content.questions.find(q => q.questionId === 25)?.observation || " "}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={{fontWeight: 'bold', width: 345, borderRight: '1px solid black'}}><Text>TOTAL</Text></View>
        <View style={styles.cellPesoD}><Text>100</Text></View>
        <View style={styles.cellPuntD}><Text>{content.score}</Text></View>
        <View style={styles.cellObserD}><Text>{content.status}</Text></View>
      </View>

      <View style={styles.rowData}>
        <View style={{fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
          <Text>OBSERVACIONES:</Text>
          <View style={{borderBottom: '1px solid black', margin: '20px 10px 10px 10px'}}></View>
          <View style={{borderBottom: '1px solid black', margin: '10px'}}></View>
          <View style={{borderBottom: '1px solid black', margin: '10px'}}></View>
          <View style={{borderBottom: '1px solid black', margin: '10px'}}></View>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={{fontWeight: 'bold', width: '100%', textAlign: 'center'}}>
          <Text>COORDINADOR</Text>
        </View>
      </View>

      <View style={styles.rowData}>
        <View style={{fontWeight: 'bold', borderRight: '1px solid black', width: '33%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center',height: '100px'}}><Text style={{marginBottom: '15px'}}>Analista de vinculación 1</Text></View>
        <View style={{fontWeight: 'bold', borderRight: '1px solid black', width: '33%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center',height: '100px'}}><Text style={{marginBottom: '15px'}}>Analista de vinculación 3</Text></View>
        <View style={{fontWeight: 'bold', width: '33%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center',height: '100px'}}><Text style={{marginBottom: '15px'}}>Director de Vinculación</Text></View>
      </View>
      
    </Page>
  </Document>
);

export default PDFDocument;
